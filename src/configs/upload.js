//nessa configuração vamos usar as 3 seguintes libs:
const path = require("path"); //para manipular caminhos de arquivos e diretorios (para navegarmos entre os diretorios)
const multer = require("multer"); // uma middleware para o express q facilita o upload de arq
const crypto = require("crypto"); //fornece funcionalidades de criptografia, sengo usado para gerar um hash aleatório.

//informações de configuração, é legar guardar em caixa alta
//endereços: sao pastas
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
//caminho absoluto para o diretório temporário onde os arquivos serão temporariamente armazenados antes de serem movidos para o destino final.
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");
//caminho absoluto para o diretório final onde os arquivos serão armazenados após o upload. Vai salvar na subpasta (crie essa subpasta, pois se ñ existir ele ñ vai criar) uploads, dentro da pasta tmp (TMP_FOLDER)

const MULTER = {
	//P/fazer o upload de arq vamos usar a lib multer
	//define um objeto chamado storage que usa o multer.diskStorage para configurar o armazenamento em disco dos arquivos
	storage: multer.diskStorage({
		//onde vamos salvar o arquivo do upload
		destination: TMP_FOLDER,
		//para garantir que cada arq tenha um nome unico vamos:
		filename(request, file, callback) {
			//gerar um numero aleatorio
			const fileHash = crypto.randomBytes(10).toString("hex");
			//no nome do arq, vamos combinar o numero aleatorio (acima) com o verdadeiro nome do arq. isso para garantir que ñ tenha arq duplicados (e assim um upload nao sobrepor o outro)
			const fileName = `${fileHash} --${file.originalname}`;

			//A função filename é chamada para cada arquivo enviado durante o upload. Ela gera um nome de arquivo único para evitar colisões, concatenando um hash aleatório com o nome original do arquivo.
			return callback(null, fileName);
		},
	}),
};

//Por fim, o módulo exporta as variáveis TMP_FOLDER, UPLOADS_FOLDER e MULTER, tornando-as disponíveis para outros módulos que importarem este arquivo de configuração. Isso é útil para manter a consistência e facilidade de manutenção, permitindo que outras partes do código acessem facilmente os diretórios e configurações relacionados ao upload de arquivos.
//exportando mais de 1 coisa ao msm tempo.
module.exports = { TMP_FOLDER, UPLOADS_FOLDER, MULTER };
