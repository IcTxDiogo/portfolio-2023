CREATE TABLE `portfolio-2023_account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` text,
	`session_state` varchar(255),
	CONSTRAINT `portfolio-2023_account_provider_providerAccountId` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `portfolio-2023_pokebroMapMarker` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`posX` int NOT NULL,
	`posY` int NOT NULL,
	`floor` int NOT NULL,
	`information` varchar(256),
	`type` varchar(256) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`deletedAt` timestamp DEFAULT NULL,
	CONSTRAINT `portfolio-2023_pokebroMapMarker_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `portfolio-2023_post` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`createdById` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `portfolio-2023_post_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `portfolio-2023_session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `portfolio-2023_session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `portfolio-2023_user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3),
	`image` varchar(255),
	CONSTRAINT `portfolio-2023_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `portfolio-2023_verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `portfolio-2023_verificationToken_identifier_token` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
CREATE INDEX `userId_idx` ON `portfolio-2023_account` (`userId`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `portfolio-2023_pokebroMapMarker` (`name`);--> statement-breakpoint
CREATE INDEX `createdById_idx` ON `portfolio-2023_post` (`createdById`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `portfolio-2023_post` (`name`);--> statement-breakpoint
CREATE INDEX `userId_idx` ON `portfolio-2023_session` (`userId`);