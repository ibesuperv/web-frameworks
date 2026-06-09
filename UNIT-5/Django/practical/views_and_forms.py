# views_and_forms.py (Django Practical Example)
# Practical Demonstrating: Django Form Classes, Custom Field Validations, and View handlers

from django import forms
from django.shortcuts import render
from django.http import HttpResponse
from django.core.exceptions import ValidationError

# ==========================================
# 1. DJANGO FORM CLASS DEFINITION
# ==========================================
class EmployeeRegistrationForm(forms.Form):
    # Field 1: Text Field (Max length 50)
    employee_name = forms.CharField(
        max_length=50, 
        label="Employee Name",
        widget=forms.TextInput(attrs={'placeholder': 'Enter full name'})
    )

    # Field 2: Email Field (Built-in regex email validator)
    email = forms.EmailField(
        label="Work Email",
        widget=forms.EmailInput(attrs={'placeholder': 'name@company.com'})
    )

    # Field 3: Integer Field
    experience_years = forms.IntegerField(
        label="Years of Experience",
        min_value=0
    )

    # Custom Field Validation: Name must not contain numeric digits
    def clean_employee_name(self):
        name = self.cleaned_data.get('employee_name')
        
        # Check if name contains numbers
        if any(char.isdigit() for char in name):
            raise ValidationError("Name cannot contain numbers.")
        
        return name

    # Custom Field Validation: Experience must be at least 2 years for registration
    def clean_experience_years(self):
        exp = self.cleaned_data.get('experience_years')
        
        if exp < 2:
            raise ValidationError("Experience must be at least 2 years for registration.")
            
        return exp

# ==========================================
# 2. DJANGO VIEW CONTROLLER
# ==========================================
def register_employee_view(request):
    # A. Check request method type
    if request.method == "POST":
        # Bind incoming POST details to the form class
        form = EmployeeRegistrationForm(request.POST)
        
        # B. Call the validations (Checks clean_ methods and core constraints)
        if form.is_valid():
            # If validated successfully, retrieve cleaned safe data dictionary
            cleaned_data = form.cleaned_data
            
            # Print to server logs
            print("Employee Registrations Success!")
            print(f"Name: {cleaned_data['employee_name']}")
            print(f"Email: {cleaned_data['email']}")
            print(f"Exp: {cleaned_data['experience_years']}")
            
            return HttpResponse("<h2>Employee successfully registered!</h2>")
    else:
        # GET Request: Return a blank form
        form = EmployeeRegistrationForm()

    # C. Pass the form instance to the context dictionary and render
    return render(request, 'employee_register.html', {'form': form})

# ==========================================
# 3. SAMPLE HTML TEMPLATE (employee_register.html)
# ==========================================
"""
<!-- Place this file in your app's templates/ folder -->
<!DOCTYPE html>
<html>
<head>
    <title>Employee Registration</title>
</head>
<body>
    <h2>Register Employee Form</h2>
    
    <!-- novalidate tells browser to skip native HTML5 validations so Django handles errors -->
    <form method="POST" novalidate>
        <!-- Security token required for POST submissions -->
        {% csrf_token %}
        
        <!-- Render form fields inside paragraph blocks -->
        {{ form.as_p }}
        
        <button type="submit">Submit Registration</button>
    </form>
</body>
</html>
"""
