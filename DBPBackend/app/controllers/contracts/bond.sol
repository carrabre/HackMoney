pragma solidity ^0.4.24;
// import "https://github.com/bandprotocol/band/blob/master/contracts/contracts/token/ERC20Interface.sol";
// contract Basiccontract is ERC20Interface{
contract Basiccontrac {
    struct lenderDetail{
        address lender;
        address lendtoken;
        string urlImage;
        uint256 amountToRaise;
        uint256 collateral;
        //Duration of Sale
        uint256 startdateofSale;
        uint256 enddateofSale;
        string collateralCurrency;
        uint256 startDiscountToZeroCoupn;
        uint256 maturityDate;
        string descriptionOFLaunch;
        string revenues;
        string LearnMoreLink;
    }
    
    mapping(address => lenderDetail) lenders;
    address[] public lendersIds;

    function lenderDescription(address lender,string memory descriptionOFLaunch, string memory revenues, string memory LearnMoreLink)public{
        lenderDetail storage l = lenders[_lender];
        l.descriptionOFLaunch = _descriptionOFLaunch;
        l.revenues = _revenues;
        l.LearnMoreLink = _LearnMoreLink; 
    }  

    function LendertokenhereorFundLoan(
        address _lender,
        address _lendtoken,
        string memory _urlImage,
        uint256 _amountToRaise,
        uint256 _collateral,
        //Duration of Sale
        uint256 _startdateofSale,
        uint256 _enddateofSale,
        string memory _collateralCurrency,
        uint256 _startDiscountToZeroCoupn,
        uint256 _maturityDate
        )public {
        lenderDetail storage l = lenders[_lender];        
        l.lender = _lender;
        l.lendtoken = _lendtoken;
        l.urlImage = _urlImage;
        l.amountToRaise = _amountToRaise;
        l.collateral = _collateral;
        l.startdateofSale = _startdateofSale;
        l.enddateofSale = _enddateofSale;
        l.collateralCurrency = _collateralCurrency;
        l.startDiscountToZeroCoupn = _startDiscountToZeroCoupn;
        l.maturityDate = _maturityDate;
        lendersIds.push(_lender);   
    }

    function getlendertoken(address _lender)view public returns (address, string memory,uint256, uint256,uint256,uint256, string memory, uint256, uint256)    
    {
        lenderDetail storage ll = lenders[_lender];
        return(ll.lendtoken,ll.urlImage,ll.amountToRaise,ll.collateral,ll.startdateofSale,ll.enddateofSale,ll.collateralCurrency,ll.startDiscountToZeroCoupn,ll.maturityDate);        
    }

    function depositeColletral(address lender , uint colletralamount)public payable{
        lender.transfer(colletralamount);
    }

    function Schedulesale(address _lender) view public returns(uint256, uint256){
        lenderDetail storage ls = lenders[_lender];
        return(ls.startdateofSale,ls.enddateofSale);
        // l.startdateofSale = _startdateofSale;
        // l.enddateofSale = _enddateofSale;
    }
    //=====================
    // function mint(address receiver, uint amount) public {
    //     require(msg.sender == minter);
    //     require(amount < 1e60);
    //     balances[receiver] += amount;
    // }
    // function approve(address spender, uint tokens) public returns (bool success) {
    //     allowed[msg.sender][spender] = tokens;
    //     emit Approval(msg.sender, spender, tokens);
    //     return true;
    // }
    function minttoken(address lender, address _lendtoken) view public returns(address,address){
        return(_lendtoken,lender);
    }
     
}



//=====================================================================

// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
contract Basiccontract{
    struct Term{
     // amount of dai to be loan
     uint256 loanDaiAmount; // loan amount
     uint256 feeDaiAmount; // intrest amount
     uint256 ethColleteralAmount; // loanamount + feedaiamount
     uint256 repayByTimestamp; //deadline
    }
    Term public term;

    // loan in 5 states . Created , funded , taken , repay and liquidated
    enum LoanState{Created, Funded, Taken}
    LoanState public state;

    //Laon State
    //modifer similar midelware that  can be execute before other function .and check some precondition .
    //Modifier that prevents some function to be called in any other state than the provide one.
    modifier onlyInState(LoanState expectedState){
        require(state == expectedState, "Not allowed in this state");
        _;
    }

    //Lender and borrower
    address payable public lender; //  address to lender who want to sell there token token 
    address payable public borrower; // address of borrower who want to buy token 
    address  public daiAddress; // address of actuall token 

    //Constructor 
    // the one who deploye the contract 
    constructor(Term memory _term, address _daiAddress){
        term = _term;
        daiAddress = _daiAddress;
        lender = payable(msg.sender);
        state = LoanState.Created;

    }

    //Funding the loan, the concept of allowance 
    // this function will be used to fund the loan ,it will pool the Dai token from the lender and lock them into the contract and the funds will available to borrow later.
    function fundLoan() public onlyInState(LoanState.Created){
        // Transfer DAI from the lender to the contract so that we can later transfer it to the borrower as a loan 
        // The required the lender to allow us to do so beforehand and will fail otherewise 
        state = LoanState.Funded;
        DAI(daiAddress).transferFrom(msg.sender,address(this),term.loanDaiAmount); // what happen when lender do'nt have enough dai , transferFrom function handle this error and it fails transaction that lender buy there dai and again deploye it .
    }

    // Taking the loan 
    //Function to take the loan
    // some terms to take loan 
    /* Collateral should be transfered when calling this function */
    // Prevent the loan from being taken twice 
    function takeLoanAndAcceptLoanTerms()public payable onlyInState(LoanState.Funded){
        // check that the exact amount of the collateral is transfered. It will be kept in the contract till the loan is repayed or liquidated 
        require(msg.value == term.ethColleteralAmount, "Invalid collateral amount");
        //record the borrower address so that only borrower can pay  the loan and unloack the collateral 

        borrower = msg.sender;
        state = LoanState.Taken;
        //transfer the actual token that are loaned 
        DAI(daiAddress).transfer(borrower,term.loanDaiAmount);
        }

    // Repaying the Loan and distructing the contract 
    // function to repay the loan It can be repay early with no fees. Borrower should allow this contract to pull the tokens before calling this.
    function repay() public onlyInState(LoanState.Taken){
        //Allowing anyone to repay would allow anyone to unlock the colletral
        require(msg.sender == borrower, "Only the borrower can repay the loan ");
        // pull the token . Both the initial amount and the fee. If there is not enough it will fail . 
        DAI(daiAddress).transferFrom(borrower,lender,term.loanDaiAmount + term.feeDaiAmount);
        // send the colleteral back to the borrower and destroy the contract 
        selfdestruct(borrower); // selfdestruct is used to release the colletral it will transfer all ethere back the borrower .
    }

    // Liquidating the loan 
    // this function is to called by the lender in case the loan is not repayed on time.
    function liquidate() public onlyInState(LoanState.Taken){
        require(msg.sender == lender, "Only the lender can liquidate the loan");
        require(block.timestamp >= term.repayByTimestamp,"Can not liquidate before the loan is due");
        // send the colletral to the lender and destroy the contract 
        selfdestruct(lender);
   }
}

//============================deposite co;;etral =============

// SPDX-License-Identifier:MIT
pragma solidity ^0.8.4;
// import "https://github.com/bandprotocol/band/blob/master/contracts/contracts/token/ERC20Interface.sol";
// contract Basiccontract is ERC20Interface{
contract Basiccontrac {
    address public dbpowner;
    constructor(address _dbpowner){
        dbpowner = _dbpowner;
    }

    struct lenderDetail{
        address lender;
        address lendtoken;
        string urlImage;
        uint256 amountToRaise;
        uint256 collateral;
        //Duration of Sale
        uint256 startdateofSale;
        uint256 enddateofSale;
        string collateralCurrency;
        uint256 startDiscountToZeroCoupn;
        uint256 maturityDate;
        string descriptionOFLaunch;
        string revenues;
        string LearnMoreLink;
    }
    mapping(address => lenderDetail) lenders;
    address[] public lendersIds;

    function lenderDescription(address _lender,string memory _descriptionOFLaunch, string memory _revenues, string memory _LearnMoreLink)public{
        lenderDetail storage l = lenders[_lender];
        l.descriptionOFLaunch = _descriptionOFLaunch;
        l.revenues = _revenues;
        l.LearnMoreLink = _LearnMoreLink; 
    }  

    function LendertokenhereorFundLoan(
        address _lender,
        address _lendtoken,
        string memory _urlImage,
        uint256 _amountToRaise,
        uint256 _collateral,
        //Duration of Sale
        uint256 _startdateofSale,
        uint256 _enddateofSale,
        string memory _collateralCurrency,
        uint256 _startDiscountToZeroCoupn,
        uint256 _maturityDate
        )public {
        lenderDetail storage l = lenders[_lender];        
        l.lender = _lender;
        l.lendtoken = _lendtoken;
        l.urlImage = _urlImage;
        l.amountToRaise = _amountToRaise;
        l.collateral = _collateral;
        l.startdateofSale = _startdateofSale;
        l.enddateofSale = _enddateofSale;
        l.collateralCurrency = _collateralCurrency;
        l.startDiscountToZeroCoupn = _startDiscountToZeroCoupn;
        l.maturityDate = _maturityDate;
        lendersIds.push(_lender);   
    }

    function getlendertoken(address _lender)view public returns (address, string memory,uint256, uint256,uint256,uint256, string memory, uint256, uint256)    
    {
        lenderDetail storage ll = lenders[_lender];
        return(ll.lendtoken,ll.urlImage,ll.amountToRaise,ll.collateral,ll.startdateofSale,ll.enddateofSale,ll.collateralCurrency,ll.startDiscountToZeroCoupn,ll.maturityDate);        
    }
   
   
    function depositeColletral(address lender,uint colletralamount)public payable{      
        colletralamount = msg.value;
        payable(dbpowner).transfer(colletralamount);
    }

    function Schedulesale(address _lender) view public returns(uint256, uint256){
        lenderDetail storage ls = lenders[_lender];
        return(ls.startdateofSale,ls.enddateofSale);
        // l.startdateofSale = _startdateofSale;
        // l.enddateofSale = _enddateofSale;
    }
  
     
}
