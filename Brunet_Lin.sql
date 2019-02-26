-- phpMyAdmin SQL Dump
-- version 4.6.6deb4
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Mar 26 Février 2019 à 15:51
-- Version du serveur :  5.7.23
-- Version de PHP :  7.0.33-0+deb9u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `Brunet_Lin`
--

-- --------------------------------------------------------

--
-- Structure de la table `friends`
--

CREATE TABLE `friends` (
  `log_user` varchar(64) NOT NULL,
  `log_friend` varchar(64) NOT NULL,
  `date_friendship` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `friends`
--

INSERT INTO `friends` (`log_user`, `log_friend`, `date_friendship`) VALUES
('toto', 'tata', '2019-02-26 11:12:44');

-- --------------------------------------------------------

--
-- Structure de la table `session`
--

CREATE TABLE `session` (
  `login` varchar(64) NOT NULL,
  `key_user` varchar(64) NOT NULL,
  `date_connexion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `session`
--

INSERT INTO `session` (`login`, `key_user`, `date_connexion`) VALUES
('tata', 'AiXkwR9Eg1V5w9uI', '2019-02-26 13:57:53'),
('toto', 'I8dZFCw2eTzYY1Po', '2019-02-26 13:57:53'),
('veyracklog', 'iPfMHJpJnMTJ1Z0t', '2019-02-26 13:57:53'),
('tatou', 'sk2k6kz0H94ZDu6R', '2019-02-26 14:31:13');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `login` varchar(32) NOT NULL,
  `password` blob NOT NULL,
  `prenom` varchar(32) NOT NULL,
  `nom` varchar(32) NOT NULL,
  `mail` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`login`, `password`, `prenom`, `nom`, `mail`) VALUES
('Spiderman', 0x6d6470, 'Peter', 'Parker', 'spider@gmail.com'),
('tata', 0x6d6470, 'second_prenom', 'second_name', 'othermail@gmail.com'),
('tatou', 0x6d6470, 'tatou', 'tati', 'mail2@gmail.com'),
('toto', 0x6d6f7464657061737365, 'first_prenom', 'first_nom', 'mail@gmail.com'),
('veyracklog', 0x6d6470, 'veyrack', 'lin', 'veymail@gmail.com');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`key_user`),
  ADD KEY `login_session` (`login`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`login`),
  ADD UNIQUE KEY `mail` (`mail`);

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `login_session` FOREIGN KEY (`login`) REFERENCES `user` (`login`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
