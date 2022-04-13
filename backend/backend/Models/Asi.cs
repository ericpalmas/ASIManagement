namespace backend.Models
{
    public class Asi
    {
        public int AsiId { get; set; }
        public string CreatedAt { get; set; }
        public int AsiState { get; set; }
        public int AsiUser { get; set; }
        public ModuleGroup[]  moduleGroups{ get; set; }
        public AsiModule[] cmAsiModules { get; set; }
        public AsiModule[] ftpAsiModules { get; set; }
        public AsiModule[] tsmAsiModules { get; set; }

    }
}
