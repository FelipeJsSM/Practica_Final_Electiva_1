$(document).ready(function () {
    $(".delete-category").on("click", function (event) {
        event.preventDefault();
        const form = $(this).closest(".form-delete");

        $.confirm({
            title: "Are you sure you want to delete this category?",
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
        const form = $(this).closest(".form-submit-category");

        let isValid = true;
    
        isValid = InputValidator("#name", isValid);
        isValid = InputValidator("#description", isValid);
    
        if (isValid) {
            form.submit(); 
        }
    });
});