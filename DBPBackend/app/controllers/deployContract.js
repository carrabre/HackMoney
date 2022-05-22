const HDWalletProvider = require('truffle-hdwallet-provider');
const path = require('path');
const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
// const resolvePath = require("./path-resolve");

async function api_compiler(){

        const ERC20code = fs.readFileSync("C:/Users/ryzen/OneDrive/Desktop/DBP_site/DBPBackend/app/controllers/contracts/token/ERC20/ERC20.sol");
        const IERC20code = fs.readFileSync("C:/Users/ryzen/OneDrive/Desktop/DBP_site/DBPBackend/app/controllers/contracts/token/ERC20/IERC20.sol");
        const IERC20Metadatacode = fs.readFileSync("C:/Users/ryzen/OneDrive/Desktop/DBP_site/DBPBackend/app/controllers/contracts/token/ERC20/extensions/IERC20Metadata.sol");
        const Contextcode = fs.readFileSync("C:/Users/ryzen/OneDrive/Desktop/DBP_site/DBPBackend/app/controllers/contracts/utils/Context.sol");

        // const ERC20code = fs.readFileSync("C:/Users/Lenovo/Desktop/DBP-site/DBPBackend/app/controllers/contracts/token/ERC20/ERC20.sol");
        // const IERC20code = fs.readFileSync("C:/Users/Lenovo/Desktop/DBP-site/DBPBackend/app/controllers/contracts/token/ERC20/IERC20.sol");
        // const IERC20Metadatacode = fs.readFileSync("C:/Users/Lenovo/Desktop/DBP-site/DBPBackend/app/controllers/contracts/token/ERC20/extensions/IERC20Metadata.sol");
        // const Contextcode = fs.readFileSync("C:/Users/Lenovo/Desktop/DBP-site/DBPBackend/app/controllers/contracts/utils/Context.sol");


        

        const inboxpath = path.resolve(__dirname,'Contracts','DebtToken.sol');
        console.log("inboxpath",inboxpath);
        const source = fs.readFileSync(inboxpath, 'UTF-8');
        // fs.ensureDirSync(buildPath);
        console.log("__dirname",__dirname);
        const input = {
        language: "Solidity",
        sources: {
            'DebtToken.sol': {
                content: source
            }
        },
        settings: {
            optimizer:{
                enabled:true
            },
            outputSelection: {
                '*': {
                    '*': [ '*' ]
                }
            }
        }
        };

        function findImports(path) {
            // if (path === "./DebtToken") return {contents: `${DebtToken}`};
            if (path === "C:/Users/ryzen/OneDrive/Desktop/DBP_site/DBPBackend/app/controllers/contracts/token/ERC20/ERC20.sol") return { contents: `${ERC20code}` };
            if (path === "C:/Users/ryzen/OneDrive/Desktop/DBP_site/DBPBackend/app/controllers/contracts/token/ERC20/IERC20.sol") return { contents: `${IERC20code}` };
            if (path === "C:/Users/ryzen/OneDrive/Desktop/DBP_site/DBPBackend/app/controllers/contracts/token/ERC20/extensions/IERC20Metadata.sol") return { contents: `${IERC20Metadatacode}`};
            if (path === "C:/Users/ryzen/OneDrive/Desktop/DBP_site/DBPBackend/app/controllers/contracts/utils/Context.sol") return { contents: `${Contextcode}` };
            else return { error: "File not found" };
        }

        //   function findImports(path) {
        //     // if (path === "./DebtToken") return {contents: `${DebtToken}`};
        //     if (path === "C:/Users/Lenovo/Desktop/DBP-site/DBPBackend/app/controllers/contracts/token/ERC20/ERC20.sol") return { contents: `${ERC20code}` };
        //     if (path === "C:/Users/Lenovo/Desktop/DBP-site/DBPBackend/app/controllers/contracts/token/ERC20/IERC20.sol") return { contents: `${IERC20code}` };
        //     if (path === "C:/Users/Lenovo/Desktop/DBP-site/DBPBackend/app/controllers/contracts/token/ERC20/extensions/IERC20Metadata.sol") return { contents: `${IERC20Metadatacode}`};
        //     if (path === "C:/Users/Lenovo/Desktop/DBP-site/DBPBackend/app/controllers/contracts/utils/Context.sol") return { contents: `${Contextcode}` };
        //     else return { error: "File not found" };
        // }

        
        const output = JSON.parse(solc.compile(JSON.stringify(input),{ import: findImports }));
        console.log("here is output",output);

        const contractFile = output.contracts['DebtToken.sol']['DebtToken'];
        console.log("2")

        //deploye script
        const bytecode =  contractFile.evm.bytecode.object;
        const abi = contractFile.abi;
        // console.log("1",output)
       
        // console.log("2")

        //deploye script
        // const bytecode =  contractFile.evm.bytecode.object;
        // const abi = contractFile.abi;
        // // console.log(abi);
        console.log("ABI",abi);
        console.log("Bytecode",bytecode);

        return [bytecode,abi]

        
}
// async function api_compiler(){

//     // const paths = resolvePath({
//     //     "ERC20.sol": "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol",
//     //     "math/SafeMath.sol":
//     //     "../node_modules/@openzeppelin/contracts/math/SafeMath.sol",
//     //     "GSN/Context.sol": "../node_modules/@openzeppelin/contracts/GSN/Context.sol",
//     //     "IERC20.sol":
//     //     "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol",
//     // });

//     const inboxpath = path.resolve(__dirname, 'Contracts', 'DebtToken.sol');
//     const source = fs.readFileSync(inboxpath, 'UTF-8');
//     console.log("here is source");
//     const input = {
//     language: 'Solidity',
//     sources: {
//         'DebtToken.sol' : {
//             content: source
//         }
//     },
//     settings: {
//         outputSelection: {
//             '*': {
//                 '*': [ '*' ]
//             }
//         }
//     }
//     };
//     console.log("1");

//     const output = JSON.parse(solc.compile(JSON.stringify(input)));
//     console.log("2",output);
//     const contractFile = output.contracts['DebtToken.sol']['DebtToken'];
//     //deploye script
//     const bytecode =  contractFile.evm.bytecode.object;
//     const abi = contractFile.abi;
//     // console.log(abi);

//     return [bytecode,abi]

    
// }
exports.deployContract = (req, res) => {

    // if (!req.body.name) {
    //     res.status(400).send({ message: "Content can not be empty!" });
    //     return;
    // }
    // const  body_data = req.body;

    api_compiler().then(
        function(value) {
          console.log("value",value)
          res.send(value);}
      );

}