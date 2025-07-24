const { addPrasadamFestival,getAllFestivals,getActivePrasadam,generateCoupon,getCouponById,getCouponByFestivalId,softdeletefestival} = require("../controllers/festivalController");
const express = require('express');
const router = express.Router();


router.post('/festivals/add', addPrasadamFestival);
router.get('/prasadam/festivals', getAllFestivals);
router.get('/prasadam/active', getActivePrasadam);
router.post('/coupon/generate', generateCoupon);
router.get('/coupon/:userId/:couponId', getCouponById);
router.get('/coupons/byFestival/:festivalId', getCouponByFestivalId);
router.patch('/prasadam/festivals/soft-delete/:festivalId',softdeletefestival );




module.exports = router;