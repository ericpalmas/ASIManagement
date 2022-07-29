namespace backend.Models
{
    public class Module
    {
        public int id_module { get; set; }
        public string code { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public int ects { get; set; }
        public int site { get; set; }
        public int responsible { get; set; }
        public int module_profile { get; set; }
        public int module_group { get; set; }
        public ModuleCalendar[] moduleCalendar { get; set; }
    }
}
