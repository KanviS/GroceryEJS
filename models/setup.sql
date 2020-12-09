CREATE TABLE tbl_grocery(
id INTEGER  PRIMARY KEY ,
name TEXT NOT NULL,
imgUrl TEXT NOT NULL,
cost NUMBER NOT NULL,
created_on DATE NOT NULL
);

insert into tbl_grocery ('id','name','imgUrl','cost','created_on')
values('Paneer',"https://healthynibblesandbits.com/wp-content/uploads/2018/10/How-to-Make-Paneer-10.jpg","24$"),
('Aspargus',"https://www.thespruceeats.com/thmb/l4Gsj31hI3vZpIrQdjM2ERHk28c=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Asparagus-56a2a8a13df78cf77278871a.jpg","60$"),
('Cheese',"https://media.gq.com/photos/581799e0a6fe84375dbe8d86/16:9/w_2560%2Cc_limit/Cheese%2525201.jpg","80.90$");

