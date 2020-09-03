// your code goes here ...
// only use ES5 features... no const, let or arrow func

var form = document.querySelector('form');
var inputAge = form.querySelector('input[name="age"]');
var inputRel = form.querySelector('select[name="rel"]');
var inputSmoker = form.querySelector('input[name="smoker"]');
var buttonAdd = form.querySelector('button.add');

var list = document.querySelector('.household');
var debug = document.querySelector('.debug');

var formData = [];

function validate(values) {
    var errors = {};

    if(isNaN(values.age) || values.age <= 0) {
        errors['age'] = 'Is required and must be a number greater than 0.';
    }

    if(values.rel === "" || typeof values.rel === 'undefined') {
        errors['rel'] = 'Is required.';
    }

    if(Object.keys(errors).length > 0) {
        return { success: false , errors }
    }

    return { success: true }
}

function clearErrors() {
    var inputErrors = form.querySelectorAll('.error');
    for(var i = 0; i < inputErrors.length; i++){
        inputErrors[i].remove();
    }
}

function insertErrors(nodeElement, error) {
    typeof error !== 'undefined' && nodeElement.insertAdjacentHTML('afterend', `<div class="error">${error}</div>`);
}

function removeListItem(e) {
    var index = Array.prototype.indexOf.call(e.target.parentNode.children, e.target);
    formData.splice(index, 1);
    e.target.parentNode.remove()
}

function createListItem({ age, rel, smoker }) {
    const removeItem = document.createElement('button');
    removeItem.append('Remove');
    removeItem.addEventListener('click', removeListItem);

    const listItem = document.createElement('li');
    listItem.append(`Age: ${age}; Relationship: ${rel}; Smoker: ${smoker} `);
    listItem.append(removeItem);

    list.append(listItem);
}

function onAdd(e) {
    e.preventDefault();
    
    var age = inputAge.value;
    var rel = inputRel.value;
    var smoker = inputSmoker.checked === true ? 'Yes' : 'No';
    var validation = validate({ age, rel, smoker })

    clearErrors();
    
    if(validation.success){
        createListItem({ age, rel, smoker});
        formData.push({ age, rel, smoker });
        form.reset();
    }
    else {
        validation.errors.age && insertErrors(inputAge, validation.errors.age);
        validation.errors.rel && insertErrors(inputRel, validation.errors.rel);
    }
}

function onSubmit(e) {
    e.preventDefault();
    debug.style.display = "block";
    debug.textContent = JSON.stringify(formData, 0, 2);
}

buttonAdd.addEventListener('click', onAdd);
form.addEventListener('submit', onSubmit);

