Returning money you borrowed from a friend is hard, isn't it? No, I am not going to tackle financial or social reasons for not returning the money. I mean it in a technical kind of way and I think of those little loans we make, when it's just more practical for one person to pay for the thing and then the others need to return their part. What do we do then?
If we have cash, then we can just use it and be done with this, however I am one of those guys that do not carry cash around. We have cards nowadays right? But you can't use it to give the money back to your friend. So at minimum you need to:
- have his name,
- have his acc#,
- know the amount,
- access your bank account to make the money transfer

The name and amount are simple to remember, but passing the account number is hard and error prone. Copy pasting does not help much with this. For access to your online bank account you can use your computer or.. your phone. Wait a sec. Can we simplify this? You do pay your bills using [QR codes](https://en.wikipedia.org/wiki/QR_code) right? What are QR codes?

Here's [QR code article from Wikipedia](https://en.wikipedia.org/wiki/QR_code). Basically QR code is a little piece of information encoded into a square barcode. Among other things it can hold your money transfer information. E.g. a money transfer QR code data look like this:

```
|PL|35000000000000370264110315|010000|Grzegorz Lachowski|transfer title|||
```

And the code itself looks like this:

<center>![|PL|35000000000000370264110315|010000|Grzegorz Lachowski|transfer title|||](http://i.imgur.com/QMSXFz2.png "Money transfer QR code example")</center>

It is a simple |-separated text format encoded into a barcode. Only required fields have been filled in:

- `PL` - a country code (ISO 3166-1 alfa-2),
- `35000000000000370274110914` - acc# (26 numbers, this one's fake),
- `010000` - amount field (this is the value of 100 zlotys),
- `Grzegorz Lachowski` - transfer receiver name,
- `transfer title` - transfer title :)

Using QR codes for money transfer is very convenient. I pay my bills this way and you should too! Sadly I haven't seen an option anywhere to create your own money transfer QR codes. That's why I made PayCode. A little webapp to create your own money transfer QR codes. This is how it works:

1. Go to [http://gregolsky.github.io/paycode/](http://gregolsky.github.io/paycode/)
2. Fill in your transfer data - don't worry it does not save anything anywhere - it's client-side only.
3. Click the submit button.
4. You will be redirected to the unique page with the qr code, for which the link you can pass to your friends.

That's it. It uses qrcode.js library, which uses canvas to generate the code. It's not perfect yet, but the basic functionality works. I still need to work on multi-lingual support, validation, shortening the unique URL and UTF-8 support in the transfer fields (QR code generation library I use does not support it yet). I hope it helps you in some way. Be sure to check the [code on my GitHub](https://github.com/gregolsky/paycode).
