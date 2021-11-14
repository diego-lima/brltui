<script>
    import { Abi } from "../js/abi";
    /**
     * VARIAVEIS
     */
    let nome = "diegoide";
    var saldo, int_depositar, int_sacar;

    const contract_addresses = {
        mynet: "0xe71ec6640739b5046f41c5c8ed24e20ad96af154",
        ropsten: "0xb17571a2905394A53E4831F853f7bBDe49360c8A",
    };
    const my_addresses = {
        test: "0x25448dd0099e604d8e5db645229d3cb27bab0432",
    };

    window.web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
    window.contract_address = undefined;
    window.abi = Abi;
    window.myaddress = undefined;

    /**
     * FUNCOES
     */
    window.cb = function (error, result) {
        console.log("error", error);
        window.error = error;
        console.log("result ", result);
        window.result = result;
    };
    function cbthen(result) {
        console.log("result ", result);
        window.result = result;
    }
    function cbcatch(error) {
        console.log("error ", error);
        window.error = error;
    }
    async function update_saldo() {
        saldo = await contract.methods.saldo().call(cb);
        saldo = web3.utils.fromWei(saldo, "wei");
    }
    async function handle_depositar() {
        var deposito = int_depositar; // copiar valor
        console.log("depositando ", deposito);
        var from = web3.utils.toChecksumAddress(myaddress);
        var to = web3.utils.toChecksumAddress(contract_address);
        var txn = {
            from: from,
            to: to,
            value: deposito,
        };

        web3.eth
            .sendTransaction(txn)
            .then(() => {
                update_saldo();
                alert("Depositei ", deposito);
            })
            .catch(function () {
                alert("Nao consegui depositar ", deposito);
                console.error(arguments);
                window.arguments = arguments;
            });
    }
    async function handle_sacar() {
        var saque = int_sacar; // copiar valor
        console.log("sacando ", saque);
        var from = web3.utils.toChecksumAddress(myaddress);
        var to = web3.utils.toChecksumAddress(contract_address);
        var txn = {
            from: from,
            to: to,
        };

        contract.methods
            .sacar(saque)
            .send(txn)
            .then(() => {
                update_saldo();
                alert("Saquei ", saque);
            })
            .catch(function () {
                alert("Nao consegui sacar ", saque);
                console.error(arguments);
                window.arguments = arguments;
            });
    }

    /**
     * SETUP
     */
    (async function () {
        window.contract_address = contract_addresses.ropsten;
        window.myaddress =
            (await web3.eth.getAccounts())[0] || my_addresses.test;

        window.contract = new web3.eth.Contract(abi, contract_address, {
            from: myaddress,
        });

        update_saldo();
    })();
</script>

<p>Hello ma brotha {nome}!</p>

<p>seu saldo é {saldo} wei!!</p>

<input type="text" placeholder="Depositar" bind:value={int_depositar} />
<button on:click={handle_depositar}>Depositar</button>

<br /> <br />

<input type="text" placeholder="Sacar" bind:value={int_sacar} />
<button on:click={handle_sacar}>Sacar</button>
