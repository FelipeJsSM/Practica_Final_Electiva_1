$(document).ready(function () {
    $(".delete-book").on("click", function (event) {
        event.preventDefault();
        const form = $(this).closest(".form-delete");

        $.confirm({
            title: "Are you sure you want to delete this book?",
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
        const form = $(this).closest(".form-submit-book");

        let isValid = true;
    
        isValid = InputValidator("#title", isValid);
        isValid = InputValidator("#published", isValid);
        isValid = InputValidator("#categoryId", isValid);
        isValid = InputValidator("#authorId", isValid);
        isValid = InputValidator("#editorialId", isValid);

        var actionValue = $('#image').closest('form').attr('action');

        if (!actionValue.includes('edit')) {
            isValid = InputValidator("#image", isValid);            
        }
    
        if (isValid) {
            form.submit(); 
        }
    });
});