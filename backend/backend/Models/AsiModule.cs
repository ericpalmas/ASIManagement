namespace backend.Models
{
    public class AsiModule
    {
        public int id_asi_module { get; set; }
        public int asi_module_group { get; set; }
        public int asi_module_state { get; set; }
        public int id_module { get; set; }
        public string code { get; set; }
        public string module_name { get; set; }
        public string module_group_initials { get; set; }
        public int module_group_id { get; set; }
        public int ects { get; set; }
        public int semester { get; set; }
        public int responsible { get; set; }
        public string responsible_name { get; set; }
        public string responsible_surname { get; set; }
        public string site { get; set; }
        public string site_initials { get; set; }

        public string[] firstProjectValues { get; set; }
        public string[] secondProjectValues { get; set; }
        public string[] masterProjectValues { get; set; }

    }
}
