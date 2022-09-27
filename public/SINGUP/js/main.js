const inputs = document.querySelectorAll(".input");
const switchDoctor = document.querySelector("label")
let count = 0;

function addcl() {
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl() {
	let parent = this.parentNode.parentNode;
	if (this.value == "") {
		parent.classList.remove("focus");
	}
}

function isDoctor() {
	let crm = document.querySelector('#crm-div')
	let crmInput = document.querySelector('#crm-div').children[1].children[1]
	switchDoctor.children[0].addEventListener('change', () => {
	 	let isDoctor = count % 2 == 0 ? false : true
		if(isDoctor){
			crmInput.setAttribute('name',"crm")
		}else{
			crmInput.removeAttribute('name')
		}
		crm.classList.toggle("invisible")
		count++
	})
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

(() => {
	isDoctor()
})()