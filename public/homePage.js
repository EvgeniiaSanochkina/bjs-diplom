const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout((callback) => {
        if (callback.success) {
            location.reload();
        }
    })
}

ApiConnector.current((callback) => {
    if (callback.success) {
        ProfileWidget.showProfile(callback.data);
    }
})

const ratesBoard = new RatesBoard();

setInterval(ApiConnector.getStocks((callback) => {
    if (callback.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(callback.data);
    }
}), 60000)

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, callback => {
        if (callback.success) {
            ProfileWidget.showProfile(callback.data);
            moneyManager.setMessage(callback.success, 'Стать больше деньги! Мощь!');
        } else {
            moneyManager.setMessage(callback.false, callback.error);
        }
    })
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, callback => {
        if (callback.success) {
            ProfileWidget.showProfile(callback.data);
            moneyManager.setMessage(callback.success, 'Конвертация успех!');
        } else {
            moneyManager.setMessage(callback.false, callback.error);
        }
    })
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, callback => {
        if (callback.success) {
            ProfileWidget.showProfile(callback.data);
            moneyManager.setMessage(callback.success, 'Отправление успех!');
        } else {
            moneyManager.setMessage(callback.false, callback.error);
        }
    })
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((callback) => {
    if (callback.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(callback.data);
        moneyManager.updateUsersList(callback.data);
    }
})

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, callback => {
        if (callback.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(callback.data);
            moneyManager.updateUsersList(callback.data);
            favoritesWidget.setMessage(callback.success, 'Новый товарищ в партия! Социальный кредит высоко!');
        } else {
            favoritesWidget.setMessage(callback.false, callback.error)
        }
    })
}

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, callback => {
        if (callback.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(callback.data);
            moneyManager.updateUsersList(callback.data);
            favoritesWidget.setMessage(callback.success, 'Товарищ разочаровать партия! Удаление!');
        } else {
            favoritesWidget.setMessage(callback.false, callback.error)
        }
    })
}