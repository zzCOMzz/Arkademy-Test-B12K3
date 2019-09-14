const is_username_valid = username =>
    /^[a-zA-Z][a-zA-Z0-9]{4,9}/.test(username);

const is_password_valid = password =>
    /[a-zA-Z0-9_!@#$%^&*+-=]{8,}/.test(password) && password.includes("@");

console.log(is_username_valid("@sony"));
console.log(is_username_valid("Ayu99v"));
console.log(is_password_valid("p@ssW0rd#"));
console.log(is_password_valid("C0d3YourFuture!#"));
