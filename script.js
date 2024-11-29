// Elementos da interface
const firstNameInput = document.getElementById('firstNameInput');
const lastNameInput = document.getElementById('lastNameInput');
const ageInput = document.getElementById('ageInput');
const genderInput = document.getElementById('genderInput');
const planInput = document.getElementById('planInput');
const addStudentButton = document.getElementById('addStudentButton');
const studentList = document.getElementById('studentList');

// Carregar alunos do LocalStorage
function loadStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.forEach(student => addStudentToDOM(student));
}

// Adicionar aluno ao DOM
function addStudentToDOM(student) {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.innerHTML = `
        <span>${student.firstName} ${student.lastName} | Idade: ${student.age} | Gênero: ${student.gender} | Plano: ${student.plan}</span>
        <button class="remove-btn" onclick="removeStudent('${student.firstName}', '${student.lastName}')">Remover</button>
    `;
    studentList.appendChild(listItem);
}

// Adicionar aluno à lista e salvar no LocalStorage
function addStudent() {
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const age = parseInt(ageInput.value.trim());
    const gender = genderInput.value;
    const plan = planInput.value;

    if (!firstName || !lastName || isNaN(age) || age < 18 || age > 100) {
        alert('Preencha todos os campos corretamente.');
        return;
    }

    const student = { firstName, lastName, age, gender, plan };

    const students = JSON.parse(localStorage.getItem('students')) || [];
    if (students.some(s => s.firstName === firstName && s.lastName === lastName)) {
        alert('Aluno já cadastrado.');
        return;
    }

    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
    addStudentToDOM(student);

    firstNameInput.value = '';
    lastNameInput.value = '';
    ageInput.value = '';
    genderInput.value = 'Masculino';
    planInput.value = 'Mensal';
}

// Remover aluno
function removeStudent(firstName, lastName) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students = students.filter(student => student.firstName !== firstName || student.lastName !== lastName);
    localStorage.setItem('students', JSON.stringify(students));
    loadStudentList();
}

// Recarregar lista
function loadStudentList() {
    studentList.innerHTML = '';
    loadStudents();
}

// Limpar LocalStorage
function clearLocalStorage() {
    localStorage.clear();
    alert('Todos os dados foram removidos do LocalStorage!');
    loadStudentList();
}

// Eventos
addStudentButton.addEventListener('click', addStudent);
document.addEventListener('DOMContentLoaded', loadStudentList);
