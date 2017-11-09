const language = {};

language.isNull = '{name} alanı boş olmalıdır';
language.isNotNull = '{name} alanı boş olamaz';
language.equalKey = '{name} alanı {p0} alanına eşit olmalıdır';
language.toInt = '{name} alanı Integera çevrilemiyor';
language.toFloat = '{name} alanı Floata çevrilemiyor';
language.toString = '{name} alanı stringe çevrilemiyor';
language.toBoolean = '{name} alanı Booleana çevrilemiyor';
language.toArray = '{name} alanı Arraya çevrilemiyor';
language.toNull = '{name} alanı nulle çevrilemiyor';
language.isInt = '{name} alanı integer Değil';
language.isNumber = '{name} alanı tam sayı Değil';
language.isPhone = '{name} alanı geçerli formatta telefon numarası değil';
language.isCardNumber = '{name} alanı geçerli formatta Kart numarası değil';
language.isEmail = '{name} alanı geçerli mail adresi değil';
language.isDomain = '{name} alanı geçerli bir site adresi değil';
language.maxLenght = '{name} alanı {p0} dan büyük olamaz';
language.minLength = '{name} alanı {p0} dan küçük olamaz';
language.rangeLenght = '{name} alanı {p0} ve {p1} arasında olmalıdır';
language.isIPv4 = '{name} alanı geçerli bir  IPv4 adresi değil';
language.isIPv6 = '{name} alanı geçerli bir IPv6 adresi değil';
language.contains = '{name} alanı {p0} değerlerinden birisi olmalıdır';
language.notContains = '{name} alanı {p0} değerlerinden birisi olmamalıdır';
language.rangeNumber = '{name} alanı {p0} ile {p1} arasında bir değer olmalıdır';

module.exports = language;