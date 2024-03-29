const connection = require('../config/connect');

var borrow = function borrow(data) {
	(this.idBook = data.idBook), (this.idUser = data.idNum),
		(this.dateBorrow = data.borrowDate),
		(this.dateReturn = data.returnDate), (this.expireDate = data.expireDate);
};

borrow.getList = () => {
	return new Promise((resolve, reject) => {
		connection.query(
			`SELECT books.idBook,books.name, Borrow.idNum, Borrow.BorrowDate as TanggalPinjam, 
                    Borrow.returnDate as TanggalBalik, Borrow.expireDate as MaksPinjam,Borrow.Penalty, users.userid, users.fullname, books.image, books.writer
				FROM Borrow 
				INNER JOIN users
				ON users.idNum = Borrow.idNum
				INNER JOIN books
				ON books.idBook = Borrow.idBook  ORDER BY idBorrow desc`,
			(err, res) => {
				if (!err) {
					resolve(res);
				} else {
					reject(new Error(err));
				}
			}
		);
	});
};

borrow.userBorrow = (idNum) => {
	return new Promise((resolve, reject) => {
		connection.query(`SELECT books.idBook,books.name, Borrow.idNum, Borrow.BorrowDate as TanggalPinjam, 
                    Borrow.returnDate as TanggalBalik, Borrow.expireDate as MaksPinjam,Borrow.Penalty, users.userid, users.fullname, books.image, books.writer, Borrow.Penalty
				FROM Borrow 
				INNER JOIN users
				ON users.idNum = Borrow.idNum
				INNER JOIN books
				ON books.idBook = Borrow.idBook WHERE users.idNum = ?`, [idNum], (err, res) => {
				if (!err) {
					resolve(res);
				} else {
					reject(new Error(err));
				}
			}
		);
	});
};

borrow.createBorrow = (newBorrow, result) => {
	return new Promise((resolve, reject) => {
		connection.query('INSERT INTO Borrow SET ?', newBorrow, (err, res) => {
			connection.query(`UPDATE books SET StatusBorrow = 1 WHERE idBook =?`, [newBorrow.idBook])
			if (!err) {
				resolve(newBorrow)
			} else {
				reject(new Error(err))
			}
		});

	})
};

borrow.updateById = (idBook, date, Penalty, result) => {
	return new Promise((resolve, reject) => {
		connection.query(`UPDATE Borrow SET returnDate = ?, Penalty = ?  WHERE idBook =? and returnDate is null`, [date, Penalty, idBook], (err, res) => {
			connection.query(`UPDATE books SET StatusBorrow =? WHERE idBook =?`, ['0', idBook])
			if (!err) {
				resolve(res);
			} else {
				reject(new Error(err));
			}
		});

	})
};
module.exports = borrow;