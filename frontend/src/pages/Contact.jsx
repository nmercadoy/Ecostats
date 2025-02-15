import React, { useState } from 'react';
import "../index.css"
import "../components/Footer.jsx"

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        // Limpiar errores específicos cuando el usuario cambia el texto
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: null
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido.';
        }
        if (!formData.email) {
            newErrors.email = 'El correo electrónico es requerido.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El correo electrónico no es válido.';
        }
        if (!formData.message.trim()) {
            newErrors.message = 'El mensaje no puede estar vacío.';
        } else if (formData.message.length < 10) {
            newErrors.message = 'El mensaje debe tener al menos 10 caracteres.';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        console.log('Form Data', formData);
        alert('Mensaje enviado! Nos pondremos en contacto contigo pronto.');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Limpiar el formulario
    };

    return (
        <div className="contact-section">
            <h2>Contacto</h2>
            <p>Si tienes alguna pregunta, por favor no dudes en enviarnos un mensaje.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                {errors.name && <p className="error">{errors.name}</p>}
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                {errors.email && <p className="error">{errors.email}</p>}
                <input
                    type="text"
                    name="subject"
                    placeholder="Asunto"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="message"
                    placeholder="Tu mensaje aquí"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
                {errors.message && <p className="error">{errors.message}</p>}
                <button type="submit">Enviar Mensaje</button>
            </form>
            <div className="contact-info">
                <p><strong>Teléfono:</strong> +123 456 7890</p>
                <p><strong>Email:</strong> EcoStats@gmail.com</p>
            </div>
        </div>
        
    );
};

export default Contact;
