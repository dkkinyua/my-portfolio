from datetime import datetime

from django.conf import settings
from django.core.mail import EmailMessage
from django.utils.html import strip_tags
from django.template.loader import render_to_string

def send_email(name, email, customer_message):
    subject = 'Email from a client'

    time = datetime.now()
    context = {
        'name': name,
        'email': email,
        'customer_message': customer_message,
        'time': time,
        'user': 'dkkinyua'
    }

    html_message = render_to_string('core/email_template.html', context)

    plain_message = strip_tags(html_message)

    email = EmailMessage(
        subject=subject,
        body=html_message,
        from_email=email,
        to=[settings.EMAIL_HOST_USER],
        reply_to=[email]
    )

    email.content_subtype = 'html'

    email.send()

    response = {"detail": "Email sent successfully!"}

    return response





