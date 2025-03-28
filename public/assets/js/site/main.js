   function InputValidator(selector, isValid) {
    const value = $(selector).val();

    if (value == "" || value == null || value == undefined) {
        $(selector).addClass("is-invalid").removeClass("is-valid");
        return false;
    }
    else {
        $(selector).addClass("is-valid").removeClass("is-invalid");

        if (!isValid) {
            return false;
        } else {
            return true;
        }
    }
}