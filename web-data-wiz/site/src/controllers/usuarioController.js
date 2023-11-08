var usuarioModel = require("../models/usuarioModel");


function buscarFuncPorId(req, res) {
    var idFuncionario = req.params.idFunc;
    usuarioModel.listarFuncionario(idFuncionario).then((resultado) => {
        res.status(200).json(resultado);
    });
};



function autenticar(req, res) {
    var cnpj = req.body.cnpjServer;
    var senha = req.body.senhaServer;

    if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(cnpj, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json(resultadoAutenticar[0]);
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function autenticarFuncionario(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticarFuncionario(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json(resultadoAutenticar[0]);
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function excluirMaquina(req, res) {
    var nomeMaquina = req.body.nomeMaquinaServer;

    if (nomeMaquina == undefined) {
        res.status(400).send("O nome da máquina está undefined!");
    } else {

        usuarioModel.excluirMaquina(nomeMaquina)
            .then(
                function (resultadoExclusaoMaquina) {
                    console.log(`\nResultados encontrados: ${resultadoExclusaoMaquina.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoExclusaoMaquina)}`); // transforma JSON em String

                    if (resultadoExclusaoMaquina.length == 1) {
                        console.log(resultadoExclusaoMaquina);
                        res.json(resultadoExclusaoMaquina[0]);
                    } else if (resultadoExclusaoMaquina.length == 0) {
                        res.status(403).send("Erro na exclusão da máquina!");
                    } else {
                        res.status(403).send("Duas máquinas com o mesmo nome!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar a exclusão! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function atualizarEmpresa(req, res) {

    var email = req.body.emailServer;
    var tel = req.body.telEmpresaServer;
    var cep = req.body.cepServer;
    var log = req.body.logServer;
    var num = req.body.numServer;
    var comp = req.body.compServer;
    var idEmpresa = req.body.idEmpresaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (tel == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.atualizarEmpresa(email, tel, cep, log, num, comp, idEmpresa)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json(resultadoAutenticar[0]);
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao atualizar os dados da empresa! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function atualizarFuncionario(req, res) {

    var novoEmail = req.body.novoEmailServer;
    var novaSenha = req.body.novaSenhaServer;
    var idFunc = req.params.idFunc;

    usuarioModel.atualizarFuncionario(novoEmail, novaSenha, idFunc)
        .then(
            function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                if (resultadoAutenticar.length == 1) {
                    console.log(resultadoAutenticar);
                    res.json(resultadoAutenticar[0]);
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao atualizar os dados do funcionário! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


function cadastrarFuncionario(req, res) {
    var fkEmpresa = req.body.fkEmpresaServer;
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var tipo = req.body.tipoUserServer;

    if (nome == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else if (email == undefined) {
        res.status(400).send("O email ta undefined")
    }
    else {

        usuarioModel.cadastrarFuncionario(nome, email, senha, fkEmpresa, tipo)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json(resultadoAutenticar[0]);
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function selectComputador(req, res) {
    var nomeMaquina = req.body.nomeMaquinaServer;
    var idComputador = req.body.idComputadorServer;

    if (nomeMaquina == undefined) {
        res.status(400).send("O nome da máquina está undefined!");
    } else {

        usuarioModel.excluirMaquina(nomeMaquina, idComputador)
            .then(
                function (resultadoExclusaoMaquina) {
                    console.log(`\nResultados encontrados: ${resultadoExclusaoMaquina.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoExclusaoMaquina)}`); // transforma JSON em String

                    if (resultadoExclusaoMaquina.length == 1) {
                        console.log(resultadoExclusaoMaquina);
                        res.json(resultadoExclusaoMaquina[0]);
                    } else if (resultadoExclusaoMaquina.length == 0) {
                        res.status(403).send("Erro no select do computador!");
                    } else {
                        res.status(403).send("Erro no select do computador!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o select da máquina! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function deletarTuplaPeloId(req, res) {
    var idComputador = req.body.fkComputadorServer;

    if (nomeMaquina == undefined) {
        res.status(400).send("O nome da máquina está undefined!");
    } else {

        usuarioModel.deletarTuplaPeloId(idComputador)
            .then(
                function (resultadoExclusaoMaquina) {
                    console.log(`\nResultados encontrados: ${resultadoExclusaoMaquina.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoExclusaoMaquina)}`); // transforma JSON em String

                    if (resultadoExclusaoMaquina.length == 1) {
                        console.log(resultadoExclusaoMaquina);
                        res.json(resultadoExclusaoMaquina[0]);
                    } else if (resultadoExclusaoMaquina.length == 0) {
                        res.status(403).send("Erro no select do computador!");
                    } else {
                        res.status(403).send("Erro no select do computador!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o select da máquina! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var razaoSocial = req.body.razaoServer;
    var cnpj = req.body.cnpjServer;
    var email = req.body.emailServer;
    var contato = req.body.contatoServer;
    var senha = req.body.senhaServer

    console.log(req.body)

    // Faça as validações dos valores
    if (razaoSocial == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(razaoSocial, cnpj, email, contato, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function cadastrarEndereco(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var cep = req.body.cepServer;
    var log = req.body.logServer;
    var num = req.body.numServer;
    var comp = req.body.compServer;
    console.log(req.body)

    // Faça as validações dos valores
    if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (log == undefined) {
        res.status(400).send("Seu logradouro está undefined!");
    } else if (num == undefined) {
        res.status(400).send("Seu numero está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarEnd(cep, log, num, comp)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function selectDataDia(req, res) {

    usuarioModel.selectDataDia()
        .then(
            function (resultadoDatas) {
                console.log(`\nResultados encontrados: ${resultadoDatas.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoDatas)}`); // transforma JSON em String

                if (resultadoDatas.length > 0) {
                    console.log(resultadoDatas);
                    res.status(200).json(resultadoDatas);
                } else if (resultadoDatas.length == 0) {
                    res.status(403).send("Erro no select de datas do dia!");
                } else {
                    res.status(404).send("Erro no select de datas do dia!!!!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o select de datas! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function selectDataSemana(req, res) {
    usuarioModel.selectDataSemana()
        .then(
            function (resultadoDatas) {
                console.log(`\nResultados encontrados: ${resultadoDatas.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoDatas)}`); // transforma JSON em String

                if (resultadoDatas.length > 0) {
                    console.log(resultadoDatas);
                    res.status(200).json(resultadoDatas);
                } else if (resultadoDatas.length == 0) {
                    res.status(403).send("Erro no select de datas do dia!");
                } else {
                    res.status(404).send("Erro no select de datas do dia!!!!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o select de datas! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function selectDataMes(req, res) {
    usuarioModel.selectDataMes()
        .then(
            function (resultadoDatas) {
                console.log(`\nResultados encontrados: ${resultadoDatas.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoDatas)}`); // transforma JSON em String

                if (resultadoDatas.length > 0) {
                    console.log(resultadoDatas);
                    res.status(200).json(resultadoDatas);
                } else if (resultadoDatas.length == 0) {
                    res.status(403).send("Erro no select de datas do dia!");
                } else {
                    res.status(404).send("Erro no select de datas do dia!!!!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o select de datas! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function selectIntervaloData(req, res) {
    if ((dataComeco || dataFim) == undefined) {
        res.status(400).send("Datas inválidas");
    } else {
        usuarioModel.selectIntervaloData(dataComeco, dataFim)
            .then(
                function (resultadoDatas) {
                    console.log(`\nResultados encontrados: ${resultadoDatas.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoDatas)}`); // transforma JSON em String

                    if (resultadoDatas.length > 0) {
                        console.log(resultadoDatas);
                        res.status(200).json(resultadoDatas);
                    } else if (resultadoDatas.length == 0) {
                        res.status(403).send("Erro no select de datas do dia!");
                    } else {
                        res.status(404).send("Erro no select de datas do dia!!!!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o select de datas! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}




module.exports = {
    autenticar,
    cadastrar,
    cadastrarEndereco,
    cadastrarFuncionario,
    autenticarFuncionario,
    buscarFuncPorId,
    atualizarEmpresa,
    atualizarFuncionario,
    excluirMaquina,
    selectComputador,
    deletarTuplaPeloId,
    selectDataDia,
    selectDataSemana,
    selectDataMes,
    selectIntervaloData
}