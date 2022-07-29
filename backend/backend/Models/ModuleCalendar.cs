namespace backend.Models
{
    public class ModuleCalendar
    {
        public int id_calendar_module { get; set; }
        public int start_year { get; set; }
        public int end_year { get; set; }
        public int fall_semester { get; set; }
        public int spring_semester { get; set; }
        public int fall_enough_sub { get; set; }
        public int spring_enough_sub { get; set; }
    }
}
