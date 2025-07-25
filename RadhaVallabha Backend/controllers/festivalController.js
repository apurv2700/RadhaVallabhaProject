const { db } = require("../config/firebase");
const { v4: uuidv4 } = require('uuid');
const { haversineDistance } = require('../utils/haversine'); 
const admin = require('firebase-admin');

// add Prasadam based festivals
exports.addPrasadamFestival = async (req, res) => {
  try {
    const { festivalName, prasadamStart, prasadamEnd, qrStart, qrEnd, festivalDate } = req.body;

    const docRef = await db.collection('prasadam_festivals').add({
      festivalName,
      prasadamStart,
      prasadamEnd,
      qrStart,
      qrEnd,
      festivalDate,
      isActive:true,
     createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ id: docRef.id });
  } catch (err) {
    console.error('Error saving festival:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// get festival for prasadam
exports.getAllFestivals = async (req, res) => {
  try {
    const snapshot = await db.collection('prasadam_festivals').where('isActive', '==', true).orderBy('festivalDate', 'desc').orderBy('createdAt', 'desc').limit(10).get();
    const festivals = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json({ success: true, festivals });
  } catch (err) {
    console.error('Error fetching festivals:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch festivals' });
  }
};


// Get today's active prasadam festival
exports.getActivePrasadam = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

  const snapshot = await db
  .collection('prasadam_festivals')
  .where('festivalDate', '==', today)
  .where('isActive', '==', true)
  .orderBy('createdAt', 'desc') 
  .limit(1)                     
  .get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'No active prasadam festival today.' });
    }

    const festivals = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(festivals);
  } catch (err) {
    console.error('Error fetching active prasadam festival:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Generate Coupon
exports.generateCoupon  =  async (req, res) => {
  try {
    const { userId, personName, numDevotees, festivalId,festivalName, userLocation } = req.body;

    // Validate input
    if (!userId || !personName || !numDevotees || !festivalId || !userLocation) {
      console.log(userId,personName,numDevotees,festivalId,userLocation,festivalName);
      return res.status(400).json({ message: 'Missing required fields' });
      
    }

    const ISKCON_BHOPAL = {
      latitude: 23.1909,
      longitude: 77.4358
    };

    // Calculate distance
    const distance = haversineDistance(userLocation, ISKCON_BHOPAL); // returns distance in meters

    console.log('User distance from ISKCON Bhopal:', distance, 'meters');

    if (distance > 50) {
      return res.status(403).json({
        message: 'You must be within 50 meters of ISKCON Bhopal to generate a coupon.'
      });
    }

    // Generate unique coupon ID
    const couponId = uuidv4();

    // Create coupon object
    const coupon = {
      _id: couponId,
      userId,
      personName,
      numDevotees,
      festivalId,
      festivalName,
      createdAt:admin.firestore.FieldValue.serverTimestamp(),
      location: userLocation,
      isActive: true,
      status: 'VALID'
    };

    // Save to Firestore (or MongoDB if that's what you're using)
    await db.collection('coupons').doc(couponId).set(coupon);

    return res.status(200).json({
      message: 'Coupon successfully generated',
      couponId,
      userId
    });
  } catch (error) {
    console.error('Coupon generation error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}


// Get coupon details by CouponID
// exports.getCouponById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const couponDoc = await db.collection('coupons').doc(id).get();

//     if (!couponDoc.exists) {
//       return res.status(404).json({ message: 'Coupon not found' });
//     }

//     const couponData = couponDoc.data();

//     return res.status(200).json({
//       message: 'Coupon fetched successfully',
//       coupon: couponData,
//       couponId: id,
//     });
//   } catch (error) {
//     console.error('Error fetching coupon:', error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };


// GET /api/coupon/:userId/:couponId
exports.getCouponByUserId = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);

  try {
    const couponQuery = await db
      .collection('coupons')
      .where('userId', '==', userId)
      .where('isActive', '==', true)
      .orderBy('createdAt', 'desc') 
      .limit(1)
      .get();

    if (couponQuery.empty) {
      return res.status(200).json({ message: 'No active coupon found for this user' });
    }

    const doc = couponQuery.docs[0];
    const coupon = doc.data();
    const couponId = doc.id;
    console.log(doc.id);
    // Get festival details
    const festivalDoc = await db.collection('prasadam_festivals').doc(coupon.festivalId).get();
    const festivalData = festivalDoc.exists ? festivalDoc.data() : null;

    return res.status(200).json({
      message: 'Latest active coupon fetched successfully',
      coupon,
      couponId,
      festivalDetails: festivalData,
    });

  } catch (error) {
    console.error('Error fetching coupon:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getCouponById = async (req, res) => {
  const { userId, couponId } = req.params;
  

  try {
    const docRef = db.collection('coupons').doc(couponId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

   

    const coupon = doc.data();

    // Check both userId match and active status
    if (coupon.userId === userId && coupon.isActive === true) {
      const festivalDoc = await db.collection('prasadam_festivals').doc(coupon.festivalId).get();
      const festivalData = festivalDoc.exists ? festivalDoc.data() : null;
    

      return res.status(200).json({
      message: 'Coupon fetched successfully',
      coupon: coupon,
      couponId: couponId,
      festivalDetails: festivalData,
    });
    } else {
      return res.status(200).json({ message: 'Coupon inactive ' ,coupon: null});
    }

  } catch (error) {
    console.error('Error fetching coupon:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// get coupon based on festival id for live event
exports.getCouponByFestivalId = async (req, res) => {
  const { festivalId } = req.params;

  try {
    const snapshot = await db.collection('coupons')
      .where('festivalId', '==', festivalId)
      .get();

    const coupons = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(coupons);
  } catch (error) {
    console.error('Error fetching coupons:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.softdeletefestival = async (req, res) => {
 const { festivalId } = req.params; 
  console.log('Festival ID:', festivalId);

  try {
    const festivalRef = db.collection('prasadam_festivals').doc(festivalId);
    const docSnapshot = await festivalRef.get();

    if (!docSnapshot.exists) {
      return res.status(404).json({ success: false, message: 'Festival not found' });
    }

    // Update the `active` field to false (soft delete)
    await festivalRef.update({ isActive: false });

    // Fetch updated active festivals
    const activeFestivalsSnapshot = await db
      .collection('prasadam_festivals')
      .where('isActive', '==', true)
      .orderBy('festivalDate', 'desc') 
      .get();

    const festivals = activeFestivalsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.json({
      success: true,
      message: 'Festival deactivated successfully',
      festivals,
    });

  } catch (error) {
    console.error('Soft delete failed:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


// Scan QR
exports.scanQR = async (req, res) => {
  const { qrId } = req.params;
  console.log(qrId);

  try {
    const qrDocRef = db.collection('coupons').doc(qrId); // your QR collection name
    const doc = await qrDocRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'QR not found' });
    }

    // Optional: Check if already used
    const qrData = doc.data();
    if (qrData.status === 'Used' || qrData.isActive === false) {
      return res.status(400).json({ message: 'QR already used or inactive' });
    }

    // Update the QR status
    await qrDocRef.update({
      status: 'USED',
      isActive: false,
      usedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({ message: 'QR marked as used' });
  } catch (err) {
    console.error('Error updating QR:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.outOfLocation = async (req, res) => {
  const { qrId } = req.params;
 

  try {
    const qrDocRef = db.collection('coupons').doc(qrId); // your QR collection name
    const doc = await qrDocRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'QR not found' });
    }

    // Optional: Check if already used
    const qrData = doc.data();
    if (qrData.status === 'Invalid' || qrData.isActive === false) {
      return res.status(400).json({ message: 'QR already Invalid or inactive' });
    }

    // Update the QR status
    await qrDocRef.update({
      status: 'INVALID',
      isActive: false,
      usedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({ message: 'QR marked as used' });
  } catch (err) {
    console.error('Error updating QR:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
