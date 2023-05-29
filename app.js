class myBudgetApp {
    constructor(add_Budget, add_Expense, table) {
        add_Budget.addEventListener('click', this.addBudget.bind(this));
        add_Expense.addEventListener('click', this.addExpense.bind(this));
        table.addEventListener('click', this.deleteExpense.bind(this));
        table.addEventListener('click', this.editExpenses.bind(this));
        this.budgetAmount = document.getElementById("total-budget");
        this.error = document.querySelectorAll(".error");
        this.showBudget = document.getElementById('show_budget');
        this.showExpenses = document.getElementById("show_expense");
        this.showBalance = document.getElementById("show_balance");
        this.expenseName = document.getElementById("expense-name");
        this.expenseAmount = document.getElementById("expense-amount");
        this.expenseCategory = document.getElementById("categories");
        this.expenseDate = document.getElementById("expense-date");
        this.template = document.querySelector("#expense-row");
        this.tbody = document.querySelector("tbody");
        this.percentageValue = document.querySelector(".percentage-value");
        this.percentageValue2 = document.querySelector(".percentage-value2")
        this.progressCircular = document.querySelector(".progress-circle");
        this.progressCircular2 = document.querySelector(".progress-circle2");
        this.clone;
        this.start = 0;
        this.start2 = 0;
    }

    // for budget used progress 
    forUsed() {
        if (this.start < this.percentage) {
            this.start++;
            progressEND(this.percentage, this.progressCircular)
        }

        else {
            this.start--;
            progressEND(this.percentage, this.progressCircular)
        }

        function progressEND(per, circle) {
            circle.style.background = `conic-gradient(#9388BB ${per * 3.6}deg, #ededed 0deg)`;
        }
    }

    // for remaining budget progress 
    forRemaining() {
        if (this.start2 < this.percentage2) {
            this.start2++;
            progressEND(this.percentage2, this.progressCircular2)
        }

        else {
            this.start--;
            progressEND(this.percentage2, this.progressCircular2)
        }

        function progressEND(per2, circle2) {
            circle2.style.background = `conic-gradient(#FF5955 ${per2 * 3.6}deg, #ededed 0deg)`;
        }
    }

    // for adding budget 
    addBudget(e) {
        e.preventDefault();
        // for error handling of budget feild
        if (this.budgetAmount.value === "" || this.budgetAmount.value === NaN || this.budgetAmount.value <= "0") {
            this.error[0].classList.add('error-show');
            this.budgetAmount.classList.add('input-error');
            setTimeout(() => {
                this.error[0].classList.remove('error-show');
                this.budgetAmount.classList.remove('input-error');
            }, 3000);
        }

        else {
            this.showBudget.innerText = +this.budgetAmount.value;
            this.showBalance.innerText = +this.budgetAmount.value - +this.showExpenses.innerText;
            this.percentage = Math.ceil((+this.showExpenses.innerText / +this.showBudget.innerText) * 100);
            this.percentageValue.textContent = `${this.percentage}%`;
            this.percentage2 = Math.floor((+this.showBalance.innerText / +this.showBudget.innerText) * 100);
            this.percentageValue2.textContent = `${this.percentage2}%`;
            this.budgetAmount.value = '';
            this.forUsed()
            this.forRemaining()
        }
    }

    // for adding expense 
    addExpense(e) {
        e.preventDefault();
        // for error handling of expense name feild
        if (this.expenseName.value === '' || /\d/.test(this.expenseName.value)) {
            this.error[1].classList.add('error-show');
            this.expenseName.classList.add('input-error');
            setTimeout(() => {
                this.error[1].classList.remove('error-show');
                this.expenseName.classList.remove('input-error');
            }, 3000);
        }

        // for error handling of expense amount feild
        else if (+this.expenseAmount.value <= 0 || this.expenseAmount.value === NaN || this.expenseAmount.value === "") {
            this.error[2].classList.add('error-show');
            this.expenseAmount.classList.add('input-error');
            setTimeout(() => {
                this.error[2].classList.remove('error-show');
                this.expenseAmount.classList.remove('input-error');
            }, 3000);
        }

        // for error handling of expense category feild
        else if (this.expenseCategory.value == "--Select" || this.expenseCategory.value === "") {
            this.error[3].classList.add('error-show');
            this.expenseCategory.classList.add('input-error');
            setTimeout(() => {
                this.error[3].classList.remove('error-show');
                this.expenseCategory.classList.remove('input-error');
            }, 3000);
        }

        // for error handling of expense date feild
        else if (this.expenseDate.value === "") {
            this.error[4].classList.add('error-show');
            this.expenseDate.classList.add('input-error');
            setTimeout(() => {
                this.error[4].classList.remove('error-show');
                this.expenseDate.classList.remove('input-error');
            }, 3000);
        }

        else {
            this.clone = this.template.content.cloneNode(true);
            let td = this.clone.querySelectorAll('td');
            td[0].innerText = this.expenseName.value;
            td[1].innerText = +this.expenseAmount.value;
            td[2].innerText = this.expenseCategory.value;
            td[3].innerText = this.expenseDate.value;
            this.tbody.appendChild(this.clone);
            this.showExpenses.innerText = +this.showExpenses.innerText + +this.expenseAmount.value;
            this.showBalance.innerText = +this.showBalance.innerText - +this.expenseAmount.value;
            this.percentage = Math.ceil((+this.showExpenses.innerText / +this.showBudget.innerText) * 100);
            this.percentageValue.textContent = `${this.percentage}%`;
            this.percentage2 = Math.floor((+this.showBalance.innerText / +this.showBudget.innerText) * 100);
            this.percentageValue2.textContent = `${this.percentage2}%`;
            this.expenseName.value = '';
            this.expenseAmount.value = '';
            this.expenseCategory.value = '';
            this.expenseDate.value = '';
            this.forUsed()
            this.forRemaining()
        }
    }

    // for deleting expense
    deleteExpense(e) {
        if (e.target.classList.contains('deleteRow')) {
            this.showBalance.innerText = +this.showBalance.innerText + +e.target.closest('tr').children[1].innerText;
            this.showExpenses.innerText = +this.showExpenses.innerText - +e.target.closest('tr').children[1].innerText;
            this.percentage = Math.ceil((+this.showExpenses.innerText / +this.showBudget.innerText) * 100);
            this.percentageValue.textContent = `${this.percentage}%`;
            this.percentage2 = Math.floor((+this.showBalance.innerText / +this.showBudget.innerText) * 100);
            this.percentageValue2.textContent = `${this.percentage2}%`;
            e.target.closest('tr').remove();
            this.forUsed()
            this.forRemaining()
        }
    }

    // for editing expense 
    editExpenses(e) {
        if (e.target.classList.contains('editRow')) {
            this.showBalance.innerText = +this.showBalance.innerText + +e.target.closest('tr').children[1].innerText;
            this.showExpenses.innerText = +this.showExpenses.innerText - +e.target.closest('tr').children[1].innerText;
            this.expenseName.value = e.target.closest('tr').children[0].innerText;
            this.expenseAmount.value = e.target.closest('tr').children[1].innerText;
            this.expenseCategory.value = e.target.closest('tr').children[2].innerText;
            this.expenseDate.value = e.target.closest('tr').children[3].innerText;
            this.percentage = Math.ceil((+this.showExpenses.innerText / +this.showBudget.innerText) * 100);
            this.percentageValue.textContent = `${this.percentage}%`;
            this.percentage2 = Math.floor((+this.showBalance.innerText / +this.showBudget.innerText) * 100);
            this.percentageValue2.textContent = `${this.percentage2}%`;
            this.expenseName.focus();
            e.target.closest('tr').remove();
            this.forUsed()
            this.forRemaining()
        }
    }
}

// above functions work when document is loaded 
document.addEventListener('DOMContentLoaded', init)
function init() {
    const add_Budget = document.querySelector('#sumbit-total-budget');
    const add_Expense = document.querySelector('#submit-expense');
    const table = document.querySelector('table');
    new myBudgetApp(add_Budget, add_Expense, table);
}


// for getting report 
const printbnt = document.getElementById("print");
printbnt.addEventListener('click', () => {
    // print();
    var body = document.body.innerHTML;
    var table2 = document.querySelector(".delete-edit").innerHTML;
    table2 ="";
    console.log(table2)
    
    var table = document.querySelector(".expense-feedback").innerHTML;
    var balance = document.querySelector(".for-content1").innerHTML;
    var balance2 = document.querySelector(".for-content2").innerHTML;
    var balance3 = document.querySelector(".for-content3").innerHTML;
    document.body.innerHTML = balance + balance2 + balance3 + "<br>" + table;
    window.print();
})
