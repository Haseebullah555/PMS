using Microsoft.Extensions.Localization;
using System.Reflection;

namespace API.Resources
{
    public class LocService
    {
        private readonly IStringLocalizer _localizer;

        public LocService(IStringLocalizerFactory factory)
        {
            var type = typeof(SharedResource);
            var assemblyName = new AssemblyName(type.GetTypeInfo().Assembly.FullName);
            _localizer = factory.Create("SharedResource", assemblyName.Name);
        }
        public LocalizedString this[string key] => _localizer[key];

        public string this[string key,params object[] args] => string.Format(_localizer[key],args);
       
    }
}
