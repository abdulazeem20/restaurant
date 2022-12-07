export function Bank() {
  let field = $(`
      <div id="bankAction">
        <h6>Account Name: <span>Abdul-Azeez Abdul-Azeem Sijuade</span></h6>
        <h6>Account Number: <span>0457193279</span></h6>
        <h6>Bank: <span>GUARRANTY TRUST BANK (GTB)</span></h6>
        <p>Fill in the following fields for payment confirmation</p>
        <form action="" id="confirmBankPayment">
            <div class="form-floating" id="first">
                <input type="text" class="form-control " name="transcId" id="transcId" placeholder="">
                <label for="transcId">Transaction Id</label>
            </div>
            <div class="form-floating" id="">
                <input type="text" class="form-control" name="amount" id="transcId" placeholder="">
                <label for="transcId">Amount</label>
            </div>
            <div class="transaction_receipt">
                <input type="file" name="transcReceipt" id="transcReceipt" hidden/>
                <label for="transcReceipt" class="btn btn-secondary" >Upload Your Transcation Receipt</label>
            </div>
            <button type="submit" class="btn btn-success" >Confirm Payment</button>
        </form>
      </div>
    `);
  return field;
}
