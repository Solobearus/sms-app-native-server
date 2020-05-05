# sms-app-native-server

## how to use

- clone the repository
- npm i
- npm start 
- create a new sql db named 'sms' with table named 'sms' the fields are:

CREATE TABLE `sms` (
  `id` int(11) NOT NULL,
  `fromNumber` varchar(20) NOT NULL,
  `toNumber` varchar(20) NOT NULL,
  `content` text NOT NULL,
  `date` text NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

- insert some mock data to play around with: 

INSERT INTO `sms` (`id`, `fromNumber`, `toNumber`, `content`, `date`, `status`) VALUES
(1, '0501112222', '0500001111', 'lets go bowling cousin!', '1588696976399', 0),
(2, '0501112222', '0509999999', 'im your father', '1588697406367', 0),
(3, '0501112222', '0509999999', 'nothing else metters', '1588697414405', 0),
(4, '0501112222', '0509999999', 'do not reply', '1588697417638', 0),

- change your credentials to fit your mysql phpmyadmin server.
- have fun 🥂🍾

