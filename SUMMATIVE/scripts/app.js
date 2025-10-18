/* ============================================
   FINANCE TRACKER - MAIN APP
   Entry point and navigation controller
   ============================================ */

// Import modules
import {
  validateDescription,
  validateAmount,
  validateDate,
  validateCategory,
} from "./validators.js";
import {
  loadTransactions,
  saveTransactions,
  addTransaction as saveNewTransaction,
  updateTransaction as saveUpdatedTransaction,
  deleteTransaction as removeTransaction,
  clearTransactions,
  loadSettings,
  saveSettings,
  exportData,
  uploadDataFromFile,
} from "./storage.js";
import {
  renderTransactions,
  updateDashboard,
  updateBalancePage,
  updateHistoryPage,
  filterTransactionsByRegex,
  sortTransactions,
  initUI,
} from "./ui.js";

/* ============================================
   NAVIGATION & SECTION MANAGEMENT
   ============================================ */

class NavigationController {
  constructor() {
    this.sections = document.querySelectorAll(".section");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.navToggle = document.querySelector(".nav-toggle");
    this.navMenu = document.querySelector(".nav-menu");

    this.init();
  }

  init() {
    // Set up navigation click handlers
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        this.navigateTo(targetId);
      });
    });

    // Mobile menu toggle
    if (this.navToggle) {
      this.navToggle.addEventListener("click", () => {
        this.toggleMobileMenu();
      });
    }

    // Handle hash changes (browser back/forward)
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.substring(1) || "home";
      this.navigateTo(hash, false);
    });

    // Handle CTA button navigation
    document.addEventListener("click", (e) => {
      const navigateBtn = e.target.closest("[data-navigate]");
      if (navigateBtn) {
        const target = navigateBtn.dataset.navigate;
        this.navigateTo(target);
      }
    });

    // Load initial section from URL hash or default to home
    const initialSection = window.location.hash.substring(1) || "home";
    this.navigateTo(initialSection, false);
  }

  navigateTo(sectionId, updateHash = true) {
    // Hide all sections
    this.sections.forEach((section) => {
      section.classList.remove("active");
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.add("active");

      // Update active nav link
      this.navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });

      // Update URL hash
      if (updateHash) {
        window.location.hash = sectionId;
      }

      // Close mobile menu if open
      if (this.navMenu && this.navMenu.classList.contains("active")) {
        this.toggleMobileMenu();
      }

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Set focus to section heading for accessibility
      const heading = targetSection.querySelector("h2");
      if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus();
        heading.removeAttribute("tabindex");
      }
    }
  }

  toggleMobileMenu() {
    const isExpanded = this.navToggle.getAttribute("aria-expanded") === "true";
    this.navToggle.setAttribute("aria-expanded", !isExpanded);
    this.navMenu.classList.toggle("active");
  }
}

/* ============================================
   FORM MANAGEMENT
   ============================================ */

class FormController {
  constructor() {
    this.transactionForm = document.getElementById("transaction-form");
    this.formSection = document.getElementById("transaction-form-section");
    this.addBtn = document.getElementById("add-transaction-btn");
    this.cancelBtn = document.getElementById("cancel-form");
    this.formHeading = document.getElementById("form-heading");

    this.editingId = null;

    this.init();
  }

  init() {
    // Show form when add button clicked
    if (this.addBtn) {
      this.addBtn.addEventListener("click", () => {
        this.showForm();
      });
    }

    // Cancel button
    if (this.cancelBtn) {
      this.cancelBtn.addEventListener("click", () => {
        this.hideForm();
      });
    }

    // Form submission
    if (this.transactionForm) {
      this.transactionForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleSubmit();
      });
    }
  }

  showForm(transactionData = null) {
    // Show form section
    document
      .querySelectorAll(".section")
      .forEach((s) => s.classList.remove("active"));
    this.formSection.classList.add("active");
    this.formSection.removeAttribute("hidden");

    if (transactionData) {
      // Edit mode
      this.editingId = transactionData.id;
      this.formHeading.textContent = "Edit Transaction";
      this.populateForm(transactionData);
    } else {
      // Add mode
      this.editingId = null;
      this.formHeading.textContent = "Add Transaction";
      this.transactionForm.reset();
    }

    // Focus first input
    const firstInput = this.transactionForm.querySelector("input");
    if (firstInput) {
      firstInput.focus();
    }
  }

  hideForm() {
    this.formSection.setAttribute("hidden", "");
    this.transactionForm.reset();
    this.editingId = null;

    // Navigate back to transactions
    window.app.nav.navigateTo("transactions");
  }

  populateForm(data) {
    document.getElementById("description").value = data.description;
    document.getElementById("amount").value = data.amount;
    document.getElementById("category").value = data.category;
    document.getElementById("date").value = data.date;
    if (data.paymentMethod) {
      document.getElementById("payment-method").value = data.paymentMethod;
    }
  }

  handleSubmit() {
    // Get form data
    const formData = {
      description: document.getElementById("description").value.trim(),
      amount: document.getElementById("amount").value.trim(),
      category: document.getElementById("category").value,
      date: document.getElementById("date").value.trim(),
      paymentMethod: document.getElementById("payment-method").value,
    };

    // Validate
    const errors = this.validateForm(formData);

    if (errors.length > 0) {
      this.displayErrors(errors);
      return;
    }

    // Clear errors
    this.clearErrors();

    // Save transaction
    let result;
    if (this.editingId) {
      result = saveUpdatedTransaction(this.editingId, formData);
    } else {
      result = saveNewTransaction(formData);
    }

    if (result) {
      // Show success message
      this.showStatus("✅ Transaction saved successfully!", "success");

      // Update UI - THIS WAS MISSING!
      renderTransactions();
      updateDashboard();
      updateBalancePage();
      updateHistoryPage();

      // Update home stats
      window.app.updateHomeStats();

      // Hide form after 1 second
      setTimeout(() => {
        this.hideForm();
      }, 1000);
    } else {
      this.showStatus("❌ Failed to save transaction", "error");
    }
  }

  validateForm(data) {
    const errors = [];

    // Use real validators
    const descResult = validateDescription(data.description);
    if (!descResult.valid) {
      errors.push({ field: "description", message: descResult.error });
    }

    const amountResult = validateAmount(data.amount);
    if (!amountResult.valid) {
      errors.push({ field: "amount", message: amountResult.error });
    }

    const categoryResult = validateCategory(data.category);
    if (!categoryResult.valid) {
      errors.push({ field: "category", message: categoryResult.error });
    }

    const dateResult = validateDate(data.date);
    if (!dateResult.valid) {
      errors.push({ field: "date", message: dateResult.error });
    }

    return errors;
  }

  displayErrors(errors) {
    errors.forEach((error) => {
      const errorElement = document.getElementById(`${error.field}-error`);
      const inputElement = document.getElementById(error.field);

      if (errorElement) {
        errorElement.textContent = error.message;
      }
      if (inputElement) {
        inputElement.classList.add("error");
        inputElement.setAttribute("aria-invalid", "true");
      }
    });

    // Focus first error
    if (errors.length > 0) {
      const firstErrorField = document.getElementById(errors[0].field);
      if (firstErrorField) {
        firstErrorField.focus();
      }
    }
  }

  clearErrors() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((msg) => (msg.textContent = ""));

    const errorInputs = document.querySelectorAll(".form-input.error");
    errorInputs.forEach((input) => {
      input.classList.remove("error");
      input.removeAttribute("aria-invalid");
    });
  }

  showStatus(message, type) {
    const statusElement = document.getElementById("form-status");
    if (statusElement) {
      statusElement.textContent = message;
      statusElement.className = `form-status ${type}`;
    }
  }
}

/* ============================================
   SETTINGS MANAGEMENT
   ============================================ */

class SettingsController {
  constructor() {
    this.settingsForm = document.getElementById("settings-form");
    this.exportBtn = document.getElementById("export-data");
    this.importBtn = document.getElementById("import-data");
    this.clearBtn = document.getElementById("clear-data");

    this.init();
  }

  init() {
    // Load saved settings
    this.loadSettingsData();

    // Save settings on form submit
    if (this.settingsForm) {
      this.settingsForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.saveSettingsData();
      });
    }

    // Export data
    if (this.exportBtn) {
      this.exportBtn.addEventListener("click", () => {
        this.exportDataToFile();
      });
    }

    // Import data
    if (this.importBtn) {
      this.importBtn.addEventListener("change", (e) => {
        this.importDataFromFile(e.target.files[0]);
      });
    }

    // Clear data
    if (this.clearBtn) {
      this.clearBtn.addEventListener("click", () => {
        this.clearAllData();
      });
    }
  }

  loadSettingsData() {
    const settings = loadSettings();

    if (settings.baseCurrency) {
      const baseEl = document.getElementById("base-currency");
      if (baseEl) baseEl.value = settings.baseCurrency;
    }
    if (settings.usdRate) {
      const usdEl = document.getElementById("usd-rate");
      if (usdEl) usdEl.value = settings.usdRate;
    }
    if (settings.eurRate) {
      const eurEl = document.getElementById("eur-rate");
      if (eurEl) eurEl.value = settings.eurRate;
    }
    if (settings.monthlyBudget !== undefined) {
      const budgetEl = document.getElementById("monthly-budget");
      if (budgetEl) budgetEl.value = settings.monthlyBudget;
    }
  }

  saveSettingsData() {
    const settings = {
      baseCurrency: document.getElementById("base-currency").value,
      usdRate: parseFloat(document.getElementById("usd-rate").value),
      eurRate: parseFloat(document.getElementById("eur-rate").value),
      monthlyBudget: parseFloat(
        document.getElementById("monthly-budget").value
      ),
    };

    const success = saveSettings(settings);

    // Show success message
    const statusElement = document.getElementById("settings-status");
    if (statusElement) {
      if (success) {
        statusElement.textContent = "✅ Settings saved successfully!";
        statusElement.className = "form-status success";
      } else {
        statusElement.textContent = "❌ Failed to save settings";
        statusElement.className = "form-status error";
      }

      setTimeout(() => {
        statusElement.textContent = "";
      }, 3000);
    }
  }

  exportDataToFile() {
    const data = exportData();

    if (!data) {
      alert("❌ Failed to export data");
      return;
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `finance-tracker-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    alert("✅ Data exported successfully!");
  }

  async importDataFromFile(file) {
    if (!file) return;

    try {
      const result = await uploadDataFromFile(file);

      if (result.success) {
        alert(`✅ ${result.message}\n\nRefreshing page...`);
        location.reload();
      } else {
        alert(`❌ Import failed: ${result.message}`);
      }
    } catch (error) {
      alert(`❌ Error importing data: ${error.message}`);
    }
  }

  clearAllData() {
    if (
      confirm(
        "⚠️ Are you sure you want to clear ALL data? This cannot be undone."
      )
    ) {
      if (
        confirm("⚠️ Really sure? All transactions will be permanently deleted.")
      ) {
        const success = clearTransactions();
        if (success) {
          alert("✅ All data cleared. Refreshing page...");
          location.reload();
        } else {
          alert("❌ Failed to clear data");
        }
      }
    }
  }
}

/* ============================================
   SEARCH & FILTER
   ============================================ */

class SearchController {
  constructor() {
    this.searchInput = document.getElementById("regex-search");
    this.caseSensitive = document.getElementById("case-sensitive");
    this.searchError = document.getElementById("search-error");
    this.sortBtns = {
      date: document.getElementById("sort-date"),
      description: document.getElementById("sort-description"),
      amount: document.getElementById("sort-amount"),
    };

    this.init();
  }

  init() {
    // Real-time search
    if (this.searchInput) {
      this.searchInput.addEventListener("input", () => {
        this.performSearch();
      });
    }

    // Case sensitive toggle
    if (this.caseSensitive) {
      this.caseSensitive.addEventListener("change", () => {
        this.performSearch();
      });
    }

    // Sort buttons
    Object.entries(this.sortBtns).forEach(([key, btn]) => {
      if (btn) {
        btn.addEventListener("click", () => {
          this.sortTransactions(key);
        });
      }
    });
  }

  performSearch() {
    const pattern = this.searchInput.value.trim();

    if (!pattern) {
      this.clearSearch();
      return;
    }

    try {
      // Compile regex
      const flags = this.caseSensitive.checked ? "" : "i";
      const regex = new RegExp(pattern, flags);

      // Clear error
      if (this.searchError) {
        this.searchError.textContent = "";
      }

      // Filter and highlight using ui.js - THIS WAS MISSING!
      filterTransactionsByRegex(regex);
    } catch (error) {
      // Show error for invalid regex
      if (this.searchError) {
        this.searchError.textContent = `Invalid regex pattern: ${error.message}`;
      }
    }
  }

  clearSearch() {
    if (this.searchError) {
      this.searchError.textContent = "";
    }
    // Show all transactions - THIS WAS MISSING!
    renderTransactions();
  }

  sortTransactions(field) {
    console.log("Sorting by:", field);
    // Implement sorting with ui.js - THIS WAS MISSING!
    sortTransactions(field, "desc");
  }
}

/* ============================================
   APP INITIALIZATION
   ============================================ */

class App {
  constructor() {
    this.nav = new NavigationController();
    this.form = new FormController();
    this.settings = new SettingsController();
    this.search = new SearchController();

    this.init();
  }

  init() {
    // Load initial data
    this.loadData();

    // Initialize UI - THIS WAS MISSING!
    initUI();

    // Update home page stats
    this.updateHomeStats();

    console.log("💰 Finance Tracker initialized!");
  }

  loadData() {
    // Load from localStorage using storage module
    const transactions = loadTransactions();
    console.log("📊 Loaded transactions:", transactions.length);

    // If no transactions, you can uncomment to load sample data
    // if (transactions.length === 0) {
    //     this.loadSampleData();
    // }

    return transactions;
  }

  loadSampleData() {
    // Sample transactions for testing
    const sampleData = [
      {
        description: "Lunch at cafeteria",
        amount: 12500,
        category: "Food",
        date: "2025-10-09",
        paymentMethod: "Cash",
      },
      {
        description: "Chemistry textbook",
        amount: 89900,
        category: "Books",
        date: "2025-10-07",
        paymentMethod: "Mobile Money",
      },
      {
        description: "Bus pass monthly",
        amount: 45000,
        category: "Transport",
        date: "2025-10-05",
        paymentMethod: "Card",
      },
    ];

    // Add sample transactions using storage module
    sampleData.forEach((data) => {
      saveNewTransaction(data);
    });

    console.log("✅ Sample data loaded");
    this.updateHomeStats();
  }

  updateHomeStats() {
    const transactions = loadTransactions();

    // Update home page quick stats
    const totalTransactions = document.getElementById(
      "home-total-transactions"
    );
    const totalSpent = document.getElementById("home-total-spent");

    if (totalTransactions) {
      totalTransactions.textContent = transactions.length;
    }

    if (totalSpent) {
      if (transactions.length > 0) {
        const total = transactions.reduce(
          (sum, t) => sum + parseFloat(t.amount),
          0
        );
        totalSpent.textContent = `RWF ${total.toLocaleString()}`;
      } else {
        totalSpent.textContent = "RWF 0";
      }
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
});

// Export for use in other modules
export { App };
