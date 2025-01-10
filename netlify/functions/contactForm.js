exports.handler = async (event, context) => {
    const formData = new URLSearchParams(event.body);
    const formSubmitURL = 'https://formsubmit.co/cd3d005e4ae3085579e67b3347577b46';

    try {
        const response = await fetch(formSubmitURL, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (response.ok) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Formulario enviado correctamente' }),
            };
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Hubo un error al enviar el formulario' }),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error interno en el servidor' }),
        };
    }
};
