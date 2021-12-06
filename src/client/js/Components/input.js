const html = {
  flights: `<div class="flight_input">
    <div class="input">
      <input id='airline' list='airline_list' class="userinput input_field required" type="text" placeholder="LH for Lufthansa" autocomplete="false" required>
      <label class="input_label" for="airline">Airline code</label>
    </div>
    <div class="input">
      <input id="flight" class="userinput input_field" type="text" placeholder="098" required>
      <label class="input_label" for="flight">Flight#</label>
    </div>
    <div class="input">
      <input class="userinput input_field" type="text" id="datepicker2" placeholder="" required>
      <label class="input_label" for="datepicker2">Date</label>
    </div>
  </div>`,
  notes: `<div class="input">
    <textarea id="notes" type="text" placeholder="" class="userinput input_field" rows="5" required></textarea>
    <label class="input_label" for="notes">Add notes for this trip</label>
  </div>`,
  packingList: `<div class="input">
    <input id="userinput" type="text" placeholder="" class="userinput input_field" required>
    <label class="input_label" for="userinput">Add items to pack for this trip</label>
  </div>`,
};
const input = (type) => html[type];
export default input;
