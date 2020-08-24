using AutoMapper;
using Connected.Models;

namespace Connected.Mappings
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<User, UserView>()
                .ForMember(
                    dest => dest.ConnectedServices,
                    opt => opt.MapFrom(src => src.ConnectedServices)
                );
        }
    }
}