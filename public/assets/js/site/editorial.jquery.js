$(document).ready(function () {
    $(".delete-editorial").on("click", function (event) {
        event.preventDefault();
        const form = $(this).closest(".form-delete");

        $.confirm({
            title: "Are you sure you want to delete this editorial?",
            content: "This action cannot be undone",
            buttons: {
                cancel: {
                    text: "Cancel",
                    btnClass: "btn btn-secondary",
                    action: function() {}
                },
                confirm: {
                    text: "Delete",
                    btnClass: "btn btn-danger",
                    action: function() {
                        form.submit();                        
                    }
                }
            }
        });
    });

    $(".btn-outline-primary").on("click", function(event) {
        event.preventDefault();
        const form = $(this).closest(".form-submit-editorial");

        let isValid = true;
    
        isValid = InputValidator("#name", isValid);
        isValid = InputValidator("#phone", isValid);
        isValid = InputValidator("#country", isValid);
    
        if (isValid) {
            form.submit(); 
        }
    });
});