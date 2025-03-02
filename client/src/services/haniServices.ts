import { Flight, FlightDetail, FlightReservation, FlightTransaction, FlightTransactionPayload, SeatDetail } from "@myTypes/flight.types";
import { SeatClass } from "@myTypes/flight.types";
import { TransactionType, Traveler, UserTransaction } from "@myTypes/user.types";

export function seatClassMultiplier(seat:SeatDetail | undefined | null){
    if(seat){
        switch(seat.class){
            case SeatClass.Economy:
                return 1
            case SeatClass.Business:
                return 1.5
            case SeatClass.First:
                return 2
            case SeatClass.AL:
                return 9.23
        }
    }
    return 0
}

export function calculateFlightSummary(reservations: FlightReservation[], flightDetail: FlightDetail | null) {
    let totalPrice = 0;
    let pricePerClass: Record<string, {price:number, count:number}> = {
        [SeatClass.Economy]: {price:0,count:0},
        [SeatClass.Business]: {price:0,count:0},
        [SeatClass.First]: {price:0,count:0},
        [SeatClass.AL]: {price:0,count:0},
    };

    if (flightDetail && flightDetail.flightRoute) {
        reservations.forEach(rsvp => {
            const classMultiplier = seatClassMultiplier(rsvp.seat);
            const seatPrice = classMultiplier * (flightDetail.flightRoute?.price || 0)
            totalPrice += seatPrice;

            if (rsvp.seat && rsvp.seat.class in pricePerClass) {
                pricePerClass[rsvp.seat.class].price = seatPrice;
                pricePerClass[rsvp.seat.class].count += 1;
            }
        });
    }

    return { totalPrice, pricePerClass };
}


export function generateUserTransaction(userId:number, price:number, status:TransactionType){
    const userTransaction:UserTransaction={
        userId:userId,
        price:price,
        status:status,
        transactionDate: new Date()
    }
    return userTransaction
}

// function generateTicketCode(flightDetail:FlightDetail, traveler:Traveler, seat:SeatDetail){
//     const initials = [
//         flightDetail.airline?.name.charAt(0), 
//         flightDetail.ID.toString().slice(-1), 
//         flightDetail.airplane?.type.charAt(0),
//         traveler.passportNumber.slice(-1),
//         seat.ID.toString().slice(-1)
//     ].join('').toUpperCase();

//     const randomComponent = Math.random().toString(36).substring(2, 8).toUpperCase();

//     let ticketCode = initials + randomComponent;

//     ticketCode = ticketCode.slice(0, 10);

//     return ticketCode;

// }

export function generateFlightTransaction(flightDetails:FlightDetail, seat:SeatDetail, baggage:number){
    const flightTransaction:FlightTransactionPayload = {
        flightId:flightDetails.ID,
        seatId:seat.ID,
        //TODO: roundtrip
        isRoundTrip:false,
        baggage:baggage,
    }

    return flightTransaction
}