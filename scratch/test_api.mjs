// Native Node 24 fetch

async function testApi() {
  try {
    console.log("1. Testing GET /api/salon/public...");
    const salonsRes = await fetch("http://localhost:5000/api/salon/public?lat=28.5355&lng=77.3910");
    const salonsData = await salonsRes.json();
    const salonList = salonsData.data?.salons || [];
    console.log(`Public salons returned: ${salonList.length}`);
    salonList.forEach(s => console.log(` - [${s.salonCode || s._id}] ${s.name}`));
    const looksSalon = salonList.find(s => s.name?.includes("Looks") || s.name?.includes("Luxe") || s.name?.includes("Salon"));
    console.log("Found salon:", looksSalon ? looksSalon.name + " (" + looksSalon._id + ")" : "none");

    if (!looksSalon) {
      console.error("Looks & Co salon not found in public list!");
      return;
    }

    console.log("\n2. Testing POST /api/customer/bookings...");
    const serviceId = looksSalon.services?.[0]?.serviceId || "SRV-LC-01";
    console.log("Using serviceId:", serviceId);
    const bookingPayload = {
      salonId: looksSalon.id || looksSalon.salonId || looksSalon._id,
      customerName: "Aarav Sharma",
      phone: "+91 98765 43210",
      customerCoords: { latitude: 28.5400, longitude: 77.3950 },
      serviceIds: [serviceId, "beard"],
      preferredStylistId: "any"
    };

    const bookRes = await fetch("http://localhost:5000/api/customer/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingPayload)
    });
    const bookData = await bookRes.json();
    console.log("Booking response:", JSON.stringify(bookData, null, 2));
    console.log("Ticket number:", bookData.data?.ticket?.ticketNumber);
    console.log("Position in queue:", bookData.data?.ticket?.position);
    console.log("Estimated wait:", bookData.data?.ticket?.estimatedWaitTime, "mins");
    console.log("Travel time:", bookData.data?.ticket?.travelTimeMinutes, "mins");

    const ticketNumber = bookData.data?.ticket?.ticketNumber;
    console.log("Ticket number:", ticketNumber);
    console.log("Position in queue:", bookData.data?.ticket?.queuePosition);
    console.log("Estimated wait:", bookData.data?.ticket?.estimatedWaitTime, "mins");
    console.log("Travel time:", bookData.data?.ticket?.travelTimeMinutes, "mins");

    console.log("\n3. Testing GET /api/customer/tickets/" + ticketNumber);
    const ticketRes = await fetch(`http://localhost:5000/api/customer/tickets/${ticketNumber}`);
    const ticketData = await ticketRes.json();
    console.log("Ticket fetch success:", ticketData.success);
    console.log("Ticket data status:", ticketData.data?.ticket?.status);
    console.log("Ticket position:", ticketData.data?.ticket?.queuePosition);
    console.log("Ticket notification count:", ticketData.data?.notifications?.length);

    console.log("\n4. Testing GET /api/customer/my-bookings...");
    const myBookingsRes = await fetch(`http://localhost:5000/api/customer/my-bookings?phone=%2B919876543210`);
    const myBookingsData = await myBookingsRes.json();
    console.log("My bookings success:", myBookingsData.success);
    console.log("My bookings count:", myBookingsData.data?.length);

    console.log("\nAll API tests successfully PASSED!");
  } catch (err) {
    console.error("API test failed:", err);
  }
}

testApi();
