import { HMSUser } from '../models/hms-user.model';
import { Reservation, Children } from '../models/reservation.model';
import * as moment from 'moment';
import { APIRequestContext } from '@playwright/test';

export class ReservationAPI {
    private apiURL: string = '/api/reservation/individualreservation';
    private createdReservationIDS: string[];
    // private interceptionReservationPOSTAPI = `${this.apiURL}/v2/**`;
    // request: APIRequestContext;

    
    private static _instance: ReservationAPI;

    public static get Instance() { // To apply singleton pattern
        return this._instance || (this._instance = new this());
    }

    // get reservationInterceptionURL() {
    //     return this.interceptionReservationPOSTAPI;
    // }

    createReservation(request: APIRequestContext, user: HMSUser, tenantID: number, payload: Partial<Reservation>) {
        
        const response = request.post(`${this.apiURL}/v2/?tenant_id=${tenantID}`, {
            data:
            this.setReservationPayloadDefaults(payload)
            ,
            headers: {
              authorization: 'Basic ' + btoa(`${user.userName}:${user.password}`),
              'content-type': 'application/json',
            }
          });
        return response;
    }

    // getReservation(user: HMSUser, tenantID: number, reservationID: number) {
    //     const options = {
    //         url: `${this.apiURL}/v2/${reservationID}?tenant_id=${tenantID}&include[]=room_nights.room_type.room_type&include[]=room_nights.room_number&include[]=room_nights.number_of_children&include[]=room_nights.number_of_adults&include[]=room_nights.children&include[]=room_nights.guest_remarks&include[]=state.name&include[]=room_nights.rate_amount`,
    //         method: 'GET',
    //         retryOnStatusCodeFailure: true,
    //         headers: { 'Authorization': 'Basic ' + btoa(`${user.userName}:${user.password}`) }
    //     };
    //     return cy.request(options);
    // }


    // changeReservationState(user: HMSUser, tenantID: number, reservationID: number, state: string, reason?: string, forceDirty?: boolean) {
    //     const options = {
    //         url: `${this.apiURL}/${reservationID}/change_state/?tenant_id=${tenantID}`,
    //         method: 'PATCH',
    //         body: { state: state, reason: reason, force_dirty: forceDirty },
    //         retryOnStatusCodeFailure: true,
    //         headers: { 'Authorization': 'Basic ' + btoa(`${user.userName}:${user.password}`) }
    //     };
    //     return cy.request(options);
    // }

    setReservationPayloadDefaults(request: Partial<Reservation>): Reservation {
        return {
            check_in_time: request.check_in_time ?? '14:00:00',
            check_out_time: request.check_out_time ?? '12:00:00',
            purpose_of_stay: request.purpose_of_stay ?? '1',
            confirmation_type: request.confirmation_type ?? 'Confirmed',
            rate_confirmation: request.rate_confirmation ?? 'Confirmed',
            reservation_confirmation: request.reservation_confirmation ?? 'Confirmed',
            reservation_mode: request.reservation_mode ?? 'daily',
            arrival_date: request.arrival_date ?? '',
            departure_date: request.departure_date ?? '',
            do_not_move: request.do_not_move ?? false,
            room_nights: request.room_nights ?? [
                {
                    room_type: 1,
                    rate: undefined,
                    actual_room_type: 1,
                    room_number: 1,
                    from_date: request.arrival_date ?? '',
                    to_date: moment(request.departure_date).isSame(request.arrival_date) ? request.arrival_date :
                        moment(request.departure_date).clone().subtract(1, 'day').format('YYYY-MM-DD') ,
                    children: [],
                    number_of_adults: 1,
                    number_of_children: 0,
                    manual_rate: true,
                    currency: '1',
                    rate_amount: '90',
                }
            ],
            name: request.name ?? 1,
            other_names: request.other_names,
            country: request.country ?? 'EG',
            channel: request.channel ?? '2',
            updated_on: '',
            overbook: true,
            outofservice: true,
            share: true,
            ...request
        };
    }

    // updateReservation(user: HMSUser, tenantID: number, payload: Partial<Reservation>) {
    //     const options = {
    //         url: `${this.apiURL}/v2/${payload.id}?tenant_id=${tenantID}`,
    //         method: 'PUT',
    //         body: payload,
    //         retryOnStatusCodeFailure: true,
    //         headers: { 'Authorization': 'Basic ' + btoa(`${user.userName}:${user.password}`) }
    //     };
    //     return cy.request(options);
    // }

    // createChildrenArray(numberOfChildren: number, numberOfFreeChildren: number): Children[] {
    //     const numberOfPaidChildren: number = numberOfChildren - numberOfFreeChildren;
    //     const children: Children[] = new Array();
    //     for (let index = 0; index < numberOfPaidChildren; index++) {
    //         const child: Children = { age: 1, child_rate: "child" };
    //         children.push(child);
    //     }
    //     for (let index = 0; index < numberOfFreeChildren; index++) {
    //         const child: Children = { age: 1, child_rate: "free" };
    //         children.push(child);
    //     }
    //     return children;
    // }

    // getAndUpdateReservation(user: HMSUser, tenantID: number, resID: number, request: Partial<Reservation>): void {
    //     this.getReservation(user, tenantID, resID).then(reservation => {
    //         const oldReservation = reservation.body.reservation;
    //         const UpdatePayload: Reservation = {
    //             ...oldReservation,
    //             ...request,
    //             name: request.name ?? oldReservation.name.id,
    //             channel: request.channel ?? oldReservation.channel.id,
    //             country: request.country ?? oldReservation.country.iso,
    //             first_meal: oldReservation.first_meal.id,
    //             room_nights: request.room_nights ?? this.getOldRoomNights(oldReservation.room_nights),
    //         };
    //         this.updateReservation(user, tenantID, UpdatePayload);
    //     });
    // }

    // getOldRoomNights(oldRoomNights: any): ReservationRoomNights[] {
    //     const roomNights: ReservationRoomNights[] = new Array();
    //     oldRoomNights.forEach(oldNight => {
    //         roomNights.push({
    //             rate: oldNight.rate.id,
    //             room_number: oldNight.room_number.id,
    //             room_type: oldNight.room_type.id,
    //             actual_room_type: oldNight.actual_room_type.id,
    //             ...oldNight,
    //         });
    //     });
    //     return roomNights;
    // }

    // getReservationsStates(user: HMSUser, tenantID: number, reservationIDS: Array<String>) {
    //     let url = `${this.apiURL}/v2/?tenant_id=${tenantID}&include[]=state.name`;
    //     reservationIDS.forEach(id => {
    //         url += `&filter{id.in}=${id}`;
    //     });
    //     const options = {
    //         url: url,
    //         headers: { 'Authorization': 'Basic ' + btoa(`${user.userName}:${user.password}`) }
    //     };
    //     return new Cypress.Promise<any>(resolve => {
    //         cy.request(options).then(response => {
    //             const IDToStateMap = {};
    //             response.body.results.reservations.forEach(reservation => {
    //                 IDToStateMap[reservation.id] = reservation.state.name;
    //             });
    //             resolve(IDToStateMap);
    //         });
    //     });
    // }

    get createdReservationIDs() {
        return this.createdReservationIDS;
    }

    addReservationID(id: string) {
        this.createdReservationIDS.push(id);
    }

    clearReservationIDs() {
        this.createdReservationIDS = [];
    }
}