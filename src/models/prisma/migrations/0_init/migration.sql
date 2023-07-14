-- CreateTable
CREATE TABLE `carts` (
    `cartID` INTEGER NOT NULL AUTO_INCREMENT,
    `id` INTEGER NULL,
    `images` VARCHAR(100) NULL,
    `name` VARCHAR(50) NULL,
    `price` VARCHAR(50) NULL,
    `quantity` INTEGER NULL,
    `username` VARCHAR(50) NULL,
    `paid` VARCHAR(50) NOT NULL,

    INDEX `id`(`id`),
    PRIMARY KEY (`cartID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `images` VARCHAR(100) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `price` VARCHAR(50) NOT NULL,
    `resolution` VARCHAR(50) NOT NULL,
    `os` VARCHAR(50) NOT NULL,
    `frontcam` VARCHAR(50) NOT NULL,
    `backcam` VARCHAR(50) NOT NULL,
    `ram` VARCHAR(50) NOT NULL,
    `rom` VARCHAR(50) NOT NULL,
    `pin` VARCHAR(50) NOT NULL,
    `quantity` INTEGER NOT NULL,

    INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `userid` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `user_name` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`userid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feedback` (
    `fbID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NULL,
    `email` VARCHAR(50) NULL,
    `phone` VARCHAR(10) NULL,
    `message` VARCHAR(1000) NULL,

    INDEX `fbID`(`fbID`),
    PRIMARY KEY (`fbID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bill` (
    `billID` INTEGER NOT NULL AUTO_INCREMENT,
    `price` VARCHAR(50) NULL,
    `address` VARCHAR(50) NULL,
    `phone` VARCHAR(50) NULL,
    `username` VARCHAR(50) NULL,
    `paid` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`billID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `billDetails` (
    `billDetailsID` INTEGER NOT NULL AUTO_INCREMENT,
    `billID` INTEGER NULL,
    `productName` VARCHAR(50) NULL,
    `quantity` INTEGER NULL,
    `price` VARCHAR(50) NULL,

    INDEX `billID`(`billID`),
    PRIMARY KEY (`billDetailsID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`id`) REFERENCES `products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `billDetails` ADD CONSTRAINT `billDetails_ibfk_1` FOREIGN KEY (`billID`) REFERENCES `bill`(`billID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

