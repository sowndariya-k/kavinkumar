(function($) {
    "use strict";

    // Email Validation
    $.fn.conformyEmailValidate = function () {
        var emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegexp.test(String($(this).val()));
    }

    // Phone Validation
    $.fn.conformyPhoneValidate = function () {
        var phoneRegexp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return phoneRegexp.test($(this).val());
    }

    // Function to close modal
    $.fn.modalClose = function() {
        let thisModalTarget = $(this).attr('id'),
            $this = $(this);
        
        $(window).on('click', function(event) {
            if(event.target.id == thisModalTarget) {
                $this.removeClass("active");
            }
        });
    }    

    // Validate Input Variables
    var contactEmail = $("input[name=contact_email]");
    var contactPhone = $("input[name=contact_phone]");
    var formControl = $('.cf-form-control');

    // Email Validation
    contactEmail.on("keyup", function() {
        if ($(this).val().trim().length > 0) {
            if (!($(this).conformyEmailValidate() === true)) {
                contactEmail.parent().removeClass("success").addClass("error");
            } else {
                contactEmail.parent().removeClass("error").addClass("success");
            }
        } else {
            contactEmail.parent().removeAttr("class");  
        }
    });

    // Phone Validation
    contactPhone.on("keyup", function() {
        if ($(this).val().trim().length > 0) {
            if (!($(this).conformyPhoneValidate() === true)) {
                contactPhone.parent().removeClass("success").addClass("error");
            } else {
                contactPhone.parent().removeClass("error").addClass("success");
            }
        } else {
            contactPhone.parent().removeAttr("class");
            contactPhone.parent().addClass("error");  
        }
    });

    $("select[name=contact_subject]").on("change", function(item) {
        var item = $(this);
        var sNull = $('select[name="contact_subject"]').find("option").eq(0).val();
        
        if (item.val() == sNull) {
            $('select[name="contact_subject"]').parent().removeClass("success").addClass("error");
        } else {
            $('select[name="contact_subject"]').parent().removeClass("error").addClass("success");
        }
    });

    // Form Control Validate
    $(".cf-form-control:not('[name=contact_email],[name=contact_phone]')").on("keyup", function() {
        if ($(this).val().trim().length > 0) {
            $(this).parent().removeClass("error").addClass("success");
        } else {
            $(this).parent().removeAttr("class");
            $(this).parent().addClass("error");
        }
    });

    // Captcha Variables    
    let textCaptcha = $("#txtCaptcha");
    let textCaptchaSpan = $('#txtCaptchaSpan');
    let textInput = $('#txtInput');

    // Generates the Random number function 
    function randomNumber() {
        let a = Math.ceil(Math.random() * 9) + '',
            b = Math.ceil(Math.random() * 9) + '',
            c = Math.ceil(Math.random() * 9) + '',
            d = Math.ceil(Math.random() * 9) + '',
            e = Math.ceil(Math.random() * 9) + '',
            code = a + b + c + d + e;

        textCaptcha.val(code);
        textCaptchaSpan.html(code);
    }

    // Called random number function
    randomNumber();

    // Validate the Entered input against the generated security code function   
    function validateCaptcha() {
        let str1 = textCaptcha.val();
        let str2 = textInput.val();
        return str1 === str2;
    }

    // Form Control Captcha Validate
    textInput.on("keyup", function() {
        if (validateCaptcha() == true) {
            $(this).parent().removeClass("error").addClass("success");
        } else {
            $(this).parent().removeAttr("class");
            $(this).parent().addClass("error");
        }
    });

    // Contact Form Submit
    // Contact Form Submit
$("#send_message").on("click", function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    
    // Gather form data
    var $this = $('#contactForm');
    var contact_name = $this.find('input[name="contact_name"]').val().trim();
    var contact_email = $this.find('input[name="contact_email"]').val().trim();
    var contact_phone = $this.find('input[name="contact_phone"]').val().trim();
    var contact_subject = $this.find('select[name="contact_subject"]').val().trim();
    var contact_message = $this.find('textarea[name="contact_message"]').val().trim();
    var validateEmail = $this.find('input[name="contact_email"]').conformyEmailValidate();
    var validatePhone = $this.find('input[name="contact_phone"]').conformyPhoneValidate();
    var selectedNull = $this.find('select[name="contact_subject"]').find("option").eq(0).val();

    // Form validation
    if (contact_name == '' || contact_email == '' || contact_phone == '' || contact_message == '' || textInput.val() == '' || contact_subject == selectedNull) {
        $this.find("li").addClass("error");
        $('#empty-form').stop().slideDown().delay(3000).slideUp();
    } else if (!validateEmail) {
        $('input[name="contact_email"]').parent().removeClass("success").addClass("error");
        $('#email-invalid').stop().slideDown().delay(3000).slideUp();
    } else if (contact_subject == selectedNull) {
        $('select[name="contact_subject"]').parent().removeClass("success").addClass("error");
        $('#subject-alert').stop().slideDown().delay(3000).slideUp();
    } else if (!validatePhone) {
        $('input[name="contact_phone"]').parent().removeClass("success").addClass("error");
        $('#phone-invalid').stop().slideDown().delay(3000).slideUp();
    } else if (!validateCaptcha()) {
        $("#textInput").parent().find("span").removeClass("success").addClass("error");
        $('#security-alert').stop().slideDown().delay(3000).slideUp();
    } else {
        $this.find(':submit').append('<span class="fas fa-spinner fa-pulse ms-3"></span>');
        $this.find(':submit').attr('disabled', 'true');

        // Create the email content in the desired format
        var emailBody = `${contact_message}\n\nName: ${contact_name}\nPhone Number: ${contact_phone}\nEmail ID: ${contact_email}`;

        // Create a mailto link with the email body
        window.location.href = `mailto:r.kavinkumar.dev@gmail.com?subject=Reg Service required: ${encodeURIComponent(contact_subject)}&body=${encodeURIComponent(emailBody)}`;
        
        // Reset the form
        $this[0].reset();
        randomNumber(); // Regenerate CAPTCHA
    }
    
    return false;
});
})(window.jQuery);
