namespace backend.Models
{
    public class Log
    {
        public int LogId { get; set; }
        public string CreatedAt { get; set; }
        public int AsiUser { get; set; }
        public string old_value { get; set; }
        public string new_value { get; set; }
        public int action { get; set; }
        public int field { get; set; }
        public int id_module { get; set; }
        public int id_asi_module { get; set; }
        public int ects { get; set; }
        public int responsible { get; set; }
        public string code { get; set; }
        public string module_name { get; set; }
        public string semester { get; set; }

    }
}



/*namespace backend.Models
{
    public class Asi
    {
        public int AsiId { get; set; }
        public string CreatedAt { get; set; }
        public int AsiState { get; set; }
        public int AsiUser { get; set; }
        public ModuleGroup[] moduleGroups { get; set; }
        public AsiModule[] cmAsiModules { get; set; }
        public AsiModule[] ftpAsiModules { get; set; }
        public AsiModule[] tsmAsiModules { get; set; }
        public AsiModule[] projectAsiModules { get; set; }
        public AsiModule[] supplementaryAsiModules { get; set; }
        public AsiModule[] masterAsiModules { get; set; }

    }
}*/
