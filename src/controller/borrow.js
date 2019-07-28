const borrow = require('../models/borrow');
const respon = require('../helpers/helper');

exports.getAll = (req, res) => {
	borrow.getList()
		.then((resultBook) => {
			respon.response(res, resultBook, 200);
		})
		.catch((err) => {
			console.log(err);
		});
};
exports.userBorrow = (req, res) => {
	let idNum = req.params.idNum
	borrow.userBorrow(idNum)
		.then((resultBook) => {
			respon.response(res, resultBook, 200);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.post = (req,res)=>{
    let date = new Date();
    date.setDate(date.getDate() + 3);
    const newBorrow = {
        idBook: req.body.idBook,
        idNum: req.body.idNum,
        borrowDate: new Date(),
    	returnDate : null,
        expireDate:date,
        }
	borrow.createBorrow(newBorrow)
		.then(() => {
			respon.response(res, newBorrow, 200);
		})
		.catch((err) => {
			console.log(err);
    });
}

exports.update = (req, res) => {
	let idBook = req.params.idBook;											
    let date = new Date();
    let penalty = req.body.penalty;
	borrow.updateById(idBook,date,penalty)
		.then((result)=>{
			respon.response(res,result,200)
		})
		.catch((err)=>{
			console.log(err)
		})
};