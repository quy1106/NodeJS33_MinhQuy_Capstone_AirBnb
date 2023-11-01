/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `BinhLuan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `maPhong` int NOT NULL,
  `maNguoiBinhLuan` int NOT NULL,
  `ngayBinhLuan` varchar(500) NOT NULL,
  `noiDung` varchar(500) NOT NULL,
  `saoBinhLuan` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `maPhong` (`maPhong`),
  KEY `maNguoiBinhLuan` (`maNguoiBinhLuan`),
  CONSTRAINT `BinhLuan_ibfk_1` FOREIGN KEY (`maPhong`) REFERENCES `Phong` (`id`) ON DELETE CASCADE,
  CONSTRAINT `BinhLuan_ibfk_2` FOREIGN KEY (`maNguoiBinhLuan`) REFERENCES `NguoiDung` (`id`) ON DELETE CASCADE,
  CONSTRAINT `BinhLuan_chk_1` CHECK ((`saoBinhLuan` >= 0)),
  CONSTRAINT `BinhLuan_chk_2` CHECK ((`saoBinhLuan` <= 5))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `DatPhong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `maPhong` int NOT NULL,
  `maNguoiDung` int NOT NULL,
  `ngayDen` varchar(500) NOT NULL,
  `ngayDi` varchar(500) NOT NULL,
  `soLuongKhach` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `maPhong` (`maPhong`),
  KEY `maNguoiDung` (`maNguoiDung`),
  CONSTRAINT `DatPhong_ibfk_1` FOREIGN KEY (`maPhong`) REFERENCES `Phong` (`id`) ON DELETE CASCADE,
  CONSTRAINT `DatPhong_ibfk_2` FOREIGN KEY (`maNguoiDung`) REFERENCES `NguoiDung` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `NguoiDung` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `phone` varchar(500) NOT NULL,
  `birthday` varchar(500) NOT NULL,
  `avatar` varchar(500) DEFAULT NULL,
  `gender` tinyint(1) NOT NULL,
  `role` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Phong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tenPhong` varchar(500) NOT NULL,
  `khach` int NOT NULL,
  `phongNgu` int NOT NULL,
  `giuong` int NOT NULL,
  `phongTam` int NOT NULL,
  `moTa` varchar(1000) DEFAULT NULL,
  `giaTien` int NOT NULL,
  `mayGiat` tinyint(1) NOT NULL,
  `banLa` tinyint(1) NOT NULL,
  `tivi` tinyint(1) NOT NULL,
  `dieuHoa` tinyint(1) NOT NULL,
  `wifi` tinyint(1) NOT NULL,
  `bep` tinyint(1) NOT NULL,
  `doXe` tinyint(1) NOT NULL,
  `hoBoi` tinyint(1) NOT NULL,
  `banUi` tinyint(1) NOT NULL,
  `maViTri` int NOT NULL,
  `hinhAnh` longtext,
  PRIMARY KEY (`id`),
  KEY `maViTri` (`maViTri`),
  CONSTRAINT `Phong_ibfk_1` FOREIGN KEY (`maViTri`) REFERENCES `ViTri` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ViTri` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tenViTri` varchar(500) NOT NULL,
  `tinhThanh` varchar(500) NOT NULL,
  `quocGia` varchar(500) NOT NULL,
  `hinhAnh` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `BinhLuan` (`id`, `maPhong`, `maNguoiBinhLuan`, `ngayBinhLuan`, `noiDung`, `saoBinhLuan`) VALUES
(1, 1, 1, '2023-11-01', 'Phòng đẹp', 5);
INSERT INTO `BinhLuan` (`id`, `maPhong`, `maNguoiBinhLuan`, `ngayBinhLuan`, `noiDung`, `saoBinhLuan`) VALUES
(4, 2, 1, '2022-12-29', 'Phòng đẹp qqqqqqqqq', 5);
INSERT INTO `BinhLuan` (`id`, `maPhong`, `maNguoiBinhLuan`, `ngayBinhLuan`, `noiDung`, `saoBinhLuan`) VALUES
(6, 2, 1, '2022-12-29', 'Phòng đẹp 123', 5);

INSERT INTO `DatPhong` (`id`, `maPhong`, `maNguoiDung`, `ngayDen`, `ngayDi`, `soLuongKhach`) VALUES
(1, 1, 1, '2023-19-10', '2023-25-10', 2);
INSERT INTO `DatPhong` (`id`, `maPhong`, `maNguoiDung`, `ngayDen`, `ngayDi`, `soLuongKhach`) VALUES
(2, 2, 1, '2023-23-10', '2022-10-10', 2);
INSERT INTO `DatPhong` (`id`, `maPhong`, `maNguoiDung`, `ngayDen`, `ngayDi`, `soLuongKhach`) VALUES
(3, 3, 1, '2022-10-27', '2022-10-31', 2);
INSERT INTO `DatPhong` (`id`, `maPhong`, `maNguoiDung`, `ngayDen`, `ngayDi`, `soLuongKhach`) VALUES
(6, 1, 2, '2022-12-28', '2022-12-30', 3);

INSERT INTO `NguoiDung` (`id`, `name`, `email`, `password`, `phone`, `birthday`, `avatar`, `gender`, `role`) VALUES
(1, 'admin', 'admin@gmail.com', '123', '123456', '2001-11-06', 'https://i.pravatar.cc/150?img=11', 1, 'ADMIN');
INSERT INTO `NguoiDung` (`id`, `name`, `email`, `password`, `phone`, `birthday`, `avatar`, `gender`, `role`) VALUES
(2, 'user2', 'user4@gmail.com', '123', '33333333', '2020-12-23', 'https://i.pravatar.cc/150?img=55', 1, 'USER');
INSERT INTO `NguoiDung` (`id`, `name`, `email`, `password`, `phone`, `birthday`, `avatar`, `gender`, `role`) VALUES
(3, 'quydeptrai555', 'quypr555@gmail.com', '123', '33333333', '2020-12-23', 'https://i.pravatar.cc/150?img=66', 1, 'USER');
INSERT INTO `NguoiDung` (`id`, `name`, `email`, `password`, `phone`, `birthday`, `avatar`, `gender`, `role`) VALUES
(8, 'userNew', 'user123@gmail.com', '123', '55555', '2022-12-28', NULL, 1, 'ADMIN'),
(9, 'minhquy123', 'minhquy123@gmail.com', '123', '33333333', '2020-12-23', NULL, 1, 'USER');

INSERT INTO `Phong` (`id`, `tenPhong`, `khach`, `phongNgu`, `giuong`, `phongTam`, `moTa`, `giaTien`, `mayGiat`, `banLa`, `tivi`, `dieuHoa`, `wifi`, `bep`, `doXe`, `hoBoi`, `banUi`, `maViTri`, `hinhAnh`) VALUES
(1, 'Phòng trong khách sạn boutique Quận 1.', 3, 1, 1, 1, 'Phòng tối giản của chúng tôi có giường cỡ queen, đi văng với bàn máy tính xách tay, loa bluetooth và phòng tắm riêng với vòi sen. Dinh Long là Chủ nhà siêu cấp Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.', 28, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, '\'/public/images/hinh-1.jpg\'');
INSERT INTO `Phong` (`id`, `tenPhong`, `khach`, `phongNgu`, `giuong`, `phongTam`, `moTa`, `giaTien`, `mayGiat`, `banLa`, `tivi`, `dieuHoa`, `wifi`, `bep`, `doXe`, `hoBoi`, `banUi`, `maViTri`, `hinhAnh`) VALUES
(2, 'STUDIO MỚI NETFLIX MIỄN PHÍ/ĐỖ XE MIỄN PHÍ', 2, 1, 1, 1, 'Không gian riêng để làm việc Một khu vực chung có Wi-fi, phù hợp để làm việc. Tự nhận phòng Tự nhận phòng bằng khóa thông minh. Kim Nam là Chủ nhà siêu cấp Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.', 21, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, '\'/public/images/hinh-2.jpg\'');
INSERT INTO `Phong` (`id`, `tenPhong`, `khach`, `phongNgu`, `giuong`, `phongTam`, `moTa`, `giaTien`, `mayGiat`, `banLa`, `tivi`, `dieuHoa`, `wifi`, `bep`, `doXe`, `hoBoi`, `banUi`, `maViTri`, `hinhAnh`) VALUES
(3, 'Phòng sang trọng với ban công tại D.1 - 200m đến Bitexco', 2, 1, 1, 1, 'Emmy là Chủ nhà siêu cấp Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách. Trải nghiệm nhận phòng tuyệt vời 100% khách gần đây đã xếp hạng 5 sao cho quy trình nhận phòng. Hủy miễn phí trước 28 thg 9.', 17, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, '\'/public/images/hinh-3.jpg\'');
INSERT INTO `Phong` (`id`, `tenPhong`, `khach`, `phongNgu`, `giuong`, `phongTam`, `moTa`, `giaTien`, `mayGiat`, `banLa`, `tivi`, `dieuHoa`, `wifi`, `bep`, `doXe`, `hoBoi`, `banUi`, `maViTri`, `hinhAnh`) VALUES
(4, 'Closer home!!!!', 4, 2, 2, 2, 'Hieu là Chủ nhà siêu cấp Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách. Địa điểm tuyệt vời 100% khách gần đây đã xếp hạng 5 sao cho vị trí này. Trải nghiệm nhận phòng tuyệt vời 100% khách gần đây đã xếp hạng 5 sao cho quy trình nhận phòng.', 28, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2, '\'/public/images/hinh-4.jpg\''),
(5, 'Toàn bộ quê hương phải của Gi ngay trung tâm Cần Thơ', 4, 2, 2, 2, 'Giang là Chủ nhà siêu cấp Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách. Địa điểm tuyệt vời 94% khách gần đây đã xếp hạng 5 sao cho vị trí này. Trải nghiệm nhận phòng tuyệt vời 94% khách gần đây đã xếp hạng 5 sao cho quy trình nhận phòng.', 25, 1, 1, 1, 1, 0, 0, 1, 0, 1, 2, '\'/public/images/hinh-5.jpg\''),
(6, 'Ngôi nhà có hoa, nắng đẹp, trung tâm Cần Thơ', 4, 1, 2, 2, 'Tự nhận phòng Tự nhận phòng với hộp khóa an toàn. Dang là Chủ nhà siêu cấp Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.', 21, 1, 1, 1, 1, 1, 1, 0, 0, 0, 2, '\'/public/images/hinh-6.jpg\''),
(7, 'Near Hon Chong-Quiet Seaview Studio to beach', 2, 1, 1, 1, 'là nơi ẩn náu mới đưa khách tham quan một hành trình kỳ thú vào bãi biển Nha Trang. Chỉ 2 phút đi bộ ra bãi biển! Câu chuyện về Trăng tròn được diễn giải lại một cách nghệ thuật theo lối trang trí sang trọng, cổ điển của ngôi nhà – một phiên bản đương đại của thần thoại truyền thống được kể bằng đồ nội thất kết hợp các chi tiết phong cách với các yếu tố Việt cổ. Chúng tôi kết hợp dịch vụ lưu trú truyền thống của châu Á với các tiện ích hiểu biết về công nghệ,', 10, 1, 1, 1, 0, 0, 0, 1, 1, 1, 3, '\'/public/images/hinh-7.jpg\''),
(8, 'Tầng 25 Căn hộ 1 phòng ngủ ấm cúng và hiện đại', 4, 1, 2, 1, 'Phòng ngủ ấm cúng và Morden 1 ở tầng 25. Cảm giác như ở nhà khi qua đêm ở đây! Mọi chi tiết trong căn hộ đều đi kèm với tinh thần nghệ thuật. Chỗ ở Toàn bộ căn hộ sẽ là của bạn! Sử dụng miễn phí tiện nghi và đồ dùng nhà bếp của chúng tôi', 15, 0, 0, 1, 1, 1, 1, 1, 1, 1, 3, '\'/public/images/hinh-8.jpg\''),
(9, 'Căn hộ mặt tiền Economy Beach với chế độ ngắm bình minh', 4, 1, 2, 1, 'Căn hộ của tôi là căn hộ mặt tiền bãi biển, hướng ra bãi biển. Bạn có thể tận hưởng bình minh từ cửa sổ. Căn hộ có thể cho thuê tối đa 4 người với 2 giường đôi. Tọa lạc tại trung tâm thành phố với nhiều nhà hàng và siêu thị xung quanh.', 18, 1, 0, 1, 0, 1, 1, 0, 0, 1, 3, '\'/public/images/hinh-9.jpg\''),
(13, 'Fisherman homestay', 2, 1, 1, 1, 'Feel free and make yourself at home Đây là nơi để bạn trốn đi những ồn ào, tấp nập của công việc. Nơi bạn có thể tận hưởng cảm giác bình yên, và ngửi được vị mặn của bỉển nhưng vẫn không mang cảm giác xa lạ. Một nơi thân thuộc như chính ngôi nhà của bạn.', 15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, '\'/public/images/hinh-1.jpg\''),
(14, 'Cách nhau 2 phòng ngủ tại thị trấn Dương Đông', 8, 2, 3, 3, 'Chào mừng bạn đến với The Yard - nơi cách trung tâm quần đảo Phú Quốc vài bước chân. Nằm trong khu phố với Thị trấn Dương Đông, Chợ đêm Phú Quốc, Bãi Dài, Chùa,... và được bao quanh bởi nhiều điều địa phương mang bạn đến gần hơn với cuộc sống hàng ngày của công dân đảo.', 43, 1, 0, 0, 0, 1, 1, 1, 1, 1, 5, '\'/public/images/hinh-8.jpg\''),
(15, 'Fisherman homestay', 4, 1, 2, 2, 'Feel free and make yourself at home. Đây là nơi để bạn trốn đi những ồn ào, tấp nập của công việc. Nơi bạn có thể tận hưởng cảm giác bình yên, nhẹ nhàng, đón những cơn gió và ngửi được vị mặn của bỉển nhưng vẫn không mang cảm giác xa lạ. Một nơi thân thuộc như chính ngôi nhà của bạn.', 33, 1, 1, 0, 0, 0, 1, 1, 1, 1, 5, '\'/public/images/hinh-2.jpg\''),
(16, 'Studio mới & ấm cúng | Riverside | Bên cạnh Cầu Hàn', 2, 1, 1, 1, 'Chào mừng bạn đến với Ngôi nhà Đậu thứ ba của tôi ở bên bờ sông Hàn, bên cạnh cầu sông Hàn studio rộng 25 m2 được trang trí tốt, rộng rãi, rất mới, tươi mới và sạch sẽ. Vị trí tuyệt vời: - 3 phút đi bộ đến Cầu Hàn, trung tâm thương mại Vincom... - 2-3 phút bằng taxi đến cầu Rồng, cầu Tình yêu, Chợ đêm Sontra và bãi biển', 13, 1, 1, 1, 0, 0, 0, 0, 0, 1, 6, '\'/public/images/hinh-7.jpg\''),
(17, 'ModernLuxury Studio cách bãi biển 1 phút', 2, 1, 1, 1, 'Đắm chìm trong vẻ đẹp hiện đại và ấm áp của ngôi nhà mới xây này. 3 phút đi bộ đến bãi biển Mỹ Khê * Không giới hạn Internet siêu tốc độ cao riêng tư/ WIFI và TV internet * Nhà bếp và máy giặt đầy đủ tiện nghi * Massage và massage phổ biến cạnh tòa nhà ', 19, 1, 1, 1, 0, 0, 0, 0, 0, 0, 6, '\'/public/images/hinh-3.jpg\''),
(18, 'Phòng mùa hè', 2, 1, 1, 1, 'Mọi thứ đều trở nên đơn giản tại chỗ ở yên bình và nằm tại vị trí trung tâm này.', 20, 1, 1, 1, 0, 0, 0, 0, 0, 0, 7, '\'/public/images/hinh-6.jpg\''),
(19, 'Căn hộ hiện đại độc đáo của Scandinavia', 2, 1, 1, 1, 'Nơi ở độc đáo này mang một phong cách rất riêng.', 17, 1, 1, 1, 0, 0, 0, 0, 0, 0, 7, '\'/public/images/hinh-4.jpg\''),
(20, 'Hill Lodge Mũi Né - Ngôi nhà nhỏ gần bãi biển', 4, 1, 1, 1, 'Đó sẽ là một ý tưởng chớp nhoáng sau khi tôi quyết định nghỉ việc. Tôi chia sẻ với bạn tôi, một kiến trúc sư, sau đó Hill Lodge được tạo ra. Thành phố này nằm trên sườn đồi trong một bãi biển dài, đó là lý do tại sao chúng tôi gọi “Hill Lodge”. Chỗ ở Hill Lodge được thiết kế theo phong cách tối giản. Chúng tôi thiết lập một số vật liệu cần thiết trong nhà nghỉ nhỏ. Nó có thể là đủ để sống và ẹnjoy sau một thời gian dài làm việc trong một thành phố bận rộn hoặc chỉ là một chuyến đi.', 27, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, '\'/public/images/hinh-1.jpg\''),
(21, 'Sky Guest House', 2, 1, 1, 1, 'Một số thông tin đã được dịch tự động. ', 19, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, '\'/public/images/hinh-5.jpg\''),
(22, 'Phòng mới thêm 2', 4, 1, 2, 1, 'Tự nhận phòng ', 120, 1, 1, 1, 0, 1, 0, 1, 1, 1, 9, NULL);

INSERT INTO `ViTri` (`id`, `tenViTri`, `tinhThanh`, `quocGia`, `hinhAnh`) VALUES
(1, 'Đà Lạt', 'Lâm Đồng', 'Việt Nam', 'https://picsum.photos/id/10/2500/1667');
INSERT INTO `ViTri` (`id`, `tenViTri`, `tinhThanh`, `quocGia`, `hinhAnh`) VALUES
(2, 'Long Hải', 'Vũng Tàu', 'Việt Nam', 'https://picsum.photos/id/11/2500/1667');
INSERT INTO `ViTri` (`id`, `tenViTri`, `tinhThanh`, `quocGia`, `hinhAnh`) VALUES
(3, 'Nha Trang', 'Khánh Hòa', 'Việt Nam', 'https://picsum.photos/id/12/2500/1667');
INSERT INTO `ViTri` (`id`, `tenViTri`, `tinhThanh`, `quocGia`, `hinhAnh`) VALUES
(5, 'Hòn Tằm', 'Phú Quốc', 'Việt Nam', 'https://picsum.photos/id/13/2500/1667'),
(6, 'Hải Châu', 'Đà Nẵng', 'Việt Nam', 'https://picsum.photos/id/14/2500/1667'),
(7, 'Hoàn Kiếm', 'Hà Nội', 'Việt Nam', 'https://picsum.photos/id/15/2500/1667'),
(8, 'Mũi Né', 'Phan Thiết', 'Việt Nam', 'https://picsum.photos/id/16/2500/1667'),
(9, 'Quận 1', 'Sài Gòn', 'Việt Nam', 'https://picsum.photos/id/17/2500/1667');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;