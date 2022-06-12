
{/**
 * 
 * Esta funcion convierte una cadena de entrada 
 * 
 * @param {*} req en los parametro del body entra la cadena a convertir
 * @param {*} res 
 * 
 * 
 * @author jose felipe escobar
 * @since 1.0.0 07/06/2022
 * 
*/}
invertCadena = (req, res) => {
    const { text } = req.query;
    res.setHeader('content-type','aplication/json');

    try {
        if (text === "" || (text.trim.lenght < 2)) {
            return res.status(400).json({
                "error": "no text"
            })
        }
    
        /**
         * funcion para limpiar y organizar la cadena de entrada
         * poone en minuscula la cadena y usa el RexEXP para remover los caracteres no deseados en el
         * @param {string} text es la cadena que envia el usuario por el request  
         * @returns una cadena de solo caracteres alfa numericos
         */
        const normalizeStr = (string) => {
            const re = /[\W_]/g; // or var re = /[^A-Za-z0-9]/g;
            return string.toLowerCase().replace(re, '')
        }

        
        /**
         * funcion que invierte la cadena previamente normalizada
         * @param {string} text 
         * @returns 
         */ 
        const reverseStr = (text) => {
            return normalizeStr(text).split('').reverse().join('');
        };

        const isPalindromo = reverseStr(text) === normalizeStr(text);
        // return {reverseStr,lowRegStr};
        let response = {
            // "Content-type": "application/json",
            "text": reverseStr(text),
            "palindromo": isPalindromo
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(400).json({
            // "Content-type": "application/json",
            "error": "no text"
        })

    }
};

module.exports = { invertCadena }