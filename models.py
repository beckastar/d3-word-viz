from app import db


class Words(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rank = db.Column(db.String(64), index=True, unique=True)
    word = db.Column(db.String(20), unique=True)  

    def __repr__(self):
        return '<User %r>' % (self.nickname)

