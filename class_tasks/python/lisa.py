import re

# Patterns
email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
phone_pattern = r'^(?:\(\d{3}\)\s*|\d{3}[.-]?)\d{3}[.-]\d{4}$'
time_pattern = r'^([01]?\d|2[0-3]):[0-5]\d(\s?[APap][Mm])?$'
credit_pattern = r'^(?:\d{4}[-\s]?){3}\d{4}$'

# list of inputs
user_email = input("Input your email: ")
Phone = input("Input phone: ")
time_input = input("Input the time (HH:MM or HH:MM AM/PM): ")
credit_card = input("Input credit card number: ")

# Responses
print("Email:", "Email is correct" if re.match(email_pattern, user_email) else "Email is incorrect")
print("URL:", "phone is correct" if re.match(phone_pattern, Phone) else "phone is incorrect")
print("Time:", "Time is correct" if re.match(time_pattern, time_input) else "Time is incorrect")
print("Credit Card:", "Credit card is correct" if re.match(credit_pattern, credit_card) else "Credit card is incorrect")