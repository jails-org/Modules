define(function(){

	/**
	* w3cookies (0.1) - 23/12/2006
	* Leandro Vieira Pinho
	* Localize-me. Blog: [ http://leandro.w3invent.com.br ], E-mail leandro[at]w3invent[dot]com[dot]br
	*/

	var date = new Date();

	return {

		// Cria o(s) cookie(s)
		// Forma de uso: w3cookies.create('nome_do_cookie','valor',dias_para_expirar);

		set: function(name, value, days) {

			var expires = '';

			if ( days ) {
				date.setTime( date.getTime() + (days*24*60*60*1000) );
				expires = '; expires=' + date.toGMTString();
			}

			document.cookie = name + '=' + value + expires + '; path=/';
		},

		// Ler as informações de um cookie em específico
		// Forma de uso: w3cookies.read('nome_do_cookie');
		read: function(name) {

			var strNameIgual = name + '=';
			var arr = document.cookie.split(';');

			for ( var i = 0, cookie; cookie = arr[i]; i++ ) {
				while ( cookie.charAt(0) == ' ') {
					cookie = cookie.substring(1,cookie.length);
				}
				if ( cookie.indexOf( strNameIgual ) == 0 ) {
					return cookie.substring( strNameIgual.length, cookie.length );
				}
			}
			return null;
		},
		// Delete um cookie desejado
		// Forma de uso: w3cookies.erase('nome_do_cookie');
		remove: function(name) {
			this.set(name,'',-1);
		}
	};

});
