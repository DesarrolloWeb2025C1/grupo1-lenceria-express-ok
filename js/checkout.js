// Checkout shipping selection behavior
document.addEventListener('DOMContentLoaded', function () {
	const fieldset = document.querySelector('.envio__seleccion-logistica');
	const addressBox = document.querySelector('.envio__direccion');

	if (!fieldset) return;

	const options = [
		{ id: 'env-andreani', value: 'andreani', labelText: 'Andreani' },
		{ id: 'env-correo-argentino', value: 'correo-argentino', labelText: 'Correo Argentino' }
	];

	fieldset.innerHTML = '<legend>Seleccionar envio</legend>';

	options.forEach(opt => {
		const input = document.createElement('input');
		input.type = 'checkbox';
		input.name = 'metodo-envio';
		input.id = opt.id;
		input.value = opt.value;
		input.checked = false;

		const label = document.createElement('label');
		label.htmlFor = opt.id;
		label.textContent = opt.labelText;

		const wrapper = document.createElement('div');
		wrapper.className = 'env-option';
		wrapper.appendChild(input);
		wrapper.appendChild(label);

		fieldset.appendChild(wrapper);
	});

	fieldset.addEventListener('change', function (e) {
		const changed = e.target;
		if (changed && changed.type === 'checkbox' && changed.name === 'metodo-envio') {
			if (changed.checked) {
				const others = fieldset.querySelectorAll('input[name="metodo-envio"]');
				others.forEach(o => {
					if (o !== changed) o.checked = false;
				});
				addressBox.classList.remove('ocultar');
			} else {
				const anyChecked = fieldset.querySelector('input[name="metodo-envio"]:checked');
				if (!anyChecked) addressBox.classList.add('ocultar');
			}
		}
	});

	fieldset.addEventListener('click', function (e) {
		const target = e.target;
		if (target.tagName.toLowerCase() === 'label') {
			const forId = target.htmlFor;
			const input = document.getElementById(forId);
			if (!input) return;
		}
	});
});

