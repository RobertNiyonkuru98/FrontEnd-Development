# Alex's version
import re

# Regex patterns
email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
currency_regex = r'^\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?$'
credit_regex = r'^(?:\d{4}[-\s]?){3}\d{4}$'
url_regex = r'^https?:\/\/(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$'

# Collecting inputs
alex_email = input("Please enter your email: ")
alex_currency = input("Enter an amount (e.g., $1,234.56): ")
alex_credit = input("Enter your credit card number: ")
alex_website = input("Enter your website URL: ")

# Function for validation
def validate(input_value, pattern, field_name):
    if re.fullmatch(pattern, input_value):
        print(f"{field_name} is valid ✅")
    else:
        print(f"{field_name} is invalid ❌")

# Validations
validate(alex_email, email_regex, "Email")
validate(alex_currency, currency_regex, "Currency")
validate(alex_credit, credit_regex, "Credit Card")
validate(alex_website, url_regex, "Website URL")
