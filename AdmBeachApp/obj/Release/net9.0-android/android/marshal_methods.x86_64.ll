; ModuleID = 'marshal_methods.x86_64.ll'
source_filename = "marshal_methods.x86_64.ll"
target datalayout = "e-m:e-p270:32:32-p271:32:32-p272:64:64-i64:64-f80:128-n8:16:32:64-S128"
target triple = "x86_64-unknown-linux-android21"

%struct.MarshalMethodName = type {
	i64, ; uint64_t id
	ptr ; char* name
}

%struct.MarshalMethodsManagedClass = type {
	i32, ; uint32_t token
	ptr ; MonoClass klass
}

@assembly_image_cache = dso_local local_unnamed_addr global [157 x ptr] zeroinitializer, align 16

; Each entry maps hash of an assembly name to an index into the `assembly_image_cache` array
@assembly_image_cache_hashes = dso_local local_unnamed_addr constant [471 x i64] [
	i64 u0x0071cf2d27b7d61e, ; 0: lib_Xamarin.AndroidX.SwipeRefreshLayout.dll.so => 92
	i64 u0x01109b0e4d99e61f, ; 1: System.ComponentModel.Annotations.dll => 105
	i64 u0x02123411c4e01926, ; 2: lib_Xamarin.AndroidX.Navigation.Runtime.dll.so => 88
	i64 u0x02a4c5a44384f885, ; 3: Microsoft.Extensions.Caching.Memory => 45
	i64 u0x02abedc11addc1ed, ; 4: lib_Mono.Android.Runtime.dll.so => 155
	i64 u0x032267b2a94db371, ; 5: lib_Xamarin.AndroidX.AppCompat.dll.so => 71
	i64 u0x0363ac97a4cb84e6, ; 6: SQLitePCLRaw.provider.e_sqlite3.dll => 69
	i64 u0x043032f1d071fae0, ; 7: ru/Microsoft.Maui.Controls.resources => 24
	i64 u0x044440a55165631e, ; 8: lib-cs-Microsoft.Maui.Controls.resources.dll.so => 2
	i64 u0x046eb1581a80c6b0, ; 9: vi/Microsoft.Maui.Controls.resources => 30
	i64 u0x0517ef04e06e9f76, ; 10: System.Net.Primitives => 128
	i64 u0x0565d18c6da3de38, ; 11: Xamarin.AndroidX.RecyclerView => 90
	i64 u0x057bf9fa9fb09f7c, ; 12: Microsoft.Data.Sqlite.dll => 39
	i64 u0x0581db89237110e9, ; 13: lib_System.Collections.dll.so => 104
	i64 u0x05989cb940b225a9, ; 14: Microsoft.Maui.dll => 63
	i64 u0x05ef98b6a1db882c, ; 15: lib_Microsoft.Data.Sqlite.dll.so => 39
	i64 u0x06076b5d2b581f08, ; 16: zh-HK/Microsoft.Maui.Controls.resources => 31
	i64 u0x06388ffe9f6c161a, ; 17: System.Xml.Linq.dll => 149
	i64 u0x0680a433c781bb3d, ; 18: Xamarin.AndroidX.Collection.Jvm => 74
	i64 u0x0690533f9fc14683, ; 19: lib_Microsoft.AspNetCore.Components.dll.so => 35
	i64 u0x07c57877c7ba78ad, ; 20: ru/Microsoft.Maui.Controls.resources.dll => 24
	i64 u0x07dcdc7460a0c5e4, ; 21: System.Collections.NonGeneric => 102
	i64 u0x08f3c9788ee2153c, ; 22: Xamarin.AndroidX.DrawerLayout => 79
	i64 u0x09138715c92dba90, ; 23: lib_System.ComponentModel.Annotations.dll.so => 105
	i64 u0x0919c28b89381a0b, ; 24: lib_Microsoft.Extensions.Options.dll.so => 58
	i64 u0x092266563089ae3e, ; 25: lib_System.Collections.NonGeneric.dll.so => 102
	i64 u0x09d144a7e214d457, ; 26: System.Security.Cryptography => 141
	i64 u0x0a805f95d98f597b, ; 27: lib_Microsoft.Extensions.Caching.Abstractions.dll.so => 44
	i64 u0x0b3b632c3bbee20c, ; 28: sk/Microsoft.Maui.Controls.resources => 25
	i64 u0x0b6aff547b84fbe9, ; 29: Xamarin.KotlinX.Serialization.Core.Jvm => 98
	i64 u0x0be2e1f8ce4064ed, ; 30: Xamarin.AndroidX.ViewPager => 93
	i64 u0x0c3ca6cc978e2aae, ; 31: pt-BR/Microsoft.Maui.Controls.resources => 21
	i64 u0x0c59ad9fbbd43abe, ; 32: Mono.Android => 156
	i64 u0x0c7790f60165fc06, ; 33: lib_Microsoft.Maui.Essentials.dll.so => 64
	i64 u0x102a31b45304b1da, ; 34: Xamarin.AndroidX.CustomView => 78
	i64 u0x10f6cfcbcf801616, ; 35: System.IO.Compression.Brotli => 117
	i64 u0x125b7f94acb989db, ; 36: Xamarin.AndroidX.RecyclerView.dll => 90
	i64 u0x13a01de0cbc3f06c, ; 37: lib-fr-Microsoft.Maui.Controls.resources.dll.so => 8
	i64 u0x13f1e5e209e91af4, ; 38: lib_Java.Interop.dll.so => 154
	i64 u0x13f1e880c25d96d1, ; 39: he/Microsoft.Maui.Controls.resources => 9
	i64 u0x143d8ea60a6a4011, ; 40: Microsoft.Extensions.DependencyInjection.Abstractions => 49
	i64 u0x16054fdcb6b3098b, ; 41: Microsoft.Extensions.DependencyModel.dll => 50
	i64 u0x17125c9a85b4929f, ; 42: lib_netstandard.dll.so => 152
	i64 u0x17b56e25558a5d36, ; 43: lib-hu-Microsoft.Maui.Controls.resources.dll.so => 12
	i64 u0x17f9358913beb16a, ; 44: System.Text.Encodings.Web => 142
	i64 u0x18402a709e357f3b, ; 45: lib_Xamarin.KotlinX.Serialization.Core.Jvm.dll.so => 98
	i64 u0x18f0ce884e87d89a, ; 46: nb/Microsoft.Maui.Controls.resources.dll => 18
	i64 u0x1a91866a319e9259, ; 47: lib_System.Collections.Concurrent.dll.so => 100
	i64 u0x1aac34d1917ba5d3, ; 48: lib_System.dll.so => 151
	i64 u0x1aad60783ffa3e5b, ; 49: lib-th-Microsoft.Maui.Controls.resources.dll.so => 27
	i64 u0x1c5217a9e4973753, ; 50: lib_Microsoft.Extensions.FileProviders.Physical.dll.so => 54
	i64 u0x1c753b5ff15bce1b, ; 51: Mono.Android.Runtime.dll => 155
	i64 u0x1e3d87657e9659bc, ; 52: Xamarin.AndroidX.Navigation.UI => 89
	i64 u0x1e71143913d56c10, ; 53: lib-ko-Microsoft.Maui.Controls.resources.dll.so => 16
	i64 u0x1ed8fcce5e9b50a0, ; 54: Microsoft.Extensions.Options.dll => 58
	i64 u0x209375905fcc1bad, ; 55: lib_System.IO.Compression.Brotli.dll.so => 117
	i64 u0x2174319c0d835bc9, ; 56: System.Runtime => 140
	i64 u0x220fd4f2e7c48170, ; 57: th/Microsoft.Maui.Controls.resources => 27
	i64 u0x237be844f1f812c7, ; 58: System.Threading.Thread.dll => 145
	i64 u0x23807c59646ec4f3, ; 59: lib_Microsoft.EntityFrameworkCore.dll.so => 40
	i64 u0x2407aef2bbe8fadf, ; 60: System.Console => 109
	i64 u0x240abe014b27e7d3, ; 61: Xamarin.AndroidX.Core.dll => 76
	i64 u0x252073cc3caa62c2, ; 62: fr/Microsoft.Maui.Controls.resources.dll => 8
	i64 u0x25a0a7eff76ea08e, ; 63: SQLitePCLRaw.batteries_v2.dll => 66
	i64 u0x2662c629b96b0b30, ; 64: lib_Xamarin.Kotlin.StdLib.dll.so => 96
	i64 u0x268c1439f13bcc29, ; 65: lib_Microsoft.Extensions.Primitives.dll.so => 59
	i64 u0x273f3515de5faf0d, ; 66: id/Microsoft.Maui.Controls.resources.dll => 13
	i64 u0x2742545f9094896d, ; 67: hr/Microsoft.Maui.Controls.resources => 11
	i64 u0x27b410442fad6cf1, ; 68: Java.Interop.dll => 154
	i64 u0x2801845a2c71fbfb, ; 69: System.Net.Primitives.dll => 128
	i64 u0x2a128783efe70ba0, ; 70: uk/Microsoft.Maui.Controls.resources.dll => 29
	i64 u0x2a3b095612184159, ; 71: lib_System.Net.NetworkInformation.dll.so => 127
	i64 u0x2a6507a5ffabdf28, ; 72: System.Diagnostics.TraceSource.dll => 112
	i64 u0x2ad156c8e1354139, ; 73: fi/Microsoft.Maui.Controls.resources => 7
	i64 u0x2af298f63581d886, ; 74: System.Text.RegularExpressions.dll => 144
	i64 u0x2afc1c4f898552ee, ; 75: lib_System.Formats.Asn1.dll.so => 116
	i64 u0x2b148910ed40fbf9, ; 76: zh-Hant/Microsoft.Maui.Controls.resources.dll => 33
	i64 u0x2b4d4904cebfa4e9, ; 77: Microsoft.Extensions.FileSystemGlobbing => 55
	i64 u0x2c8bd14bb93a7d82, ; 78: lib-pl-Microsoft.Maui.Controls.resources.dll.so => 20
	i64 u0x2cd723e9fe623c7c, ; 79: lib_System.Private.Xml.Linq.dll.so => 133
	i64 u0x2d169d318a968379, ; 80: System.Threading.dll => 146
	i64 u0x2d47774b7d993f59, ; 81: sv/Microsoft.Maui.Controls.resources.dll => 26
	i64 u0x2db915caf23548d2, ; 82: System.Text.Json.dll => 143
	i64 u0x2e6f1f226821322a, ; 83: el/Microsoft.Maui.Controls.resources.dll => 5
	i64 u0x2e8ff3fae87a8245, ; 84: lib_Microsoft.JSInterop.dll.so => 60
	i64 u0x2f2e98e1c89b1aff, ; 85: System.Xml.ReaderWriter => 150
	i64 u0x2f5911d9ba814e4e, ; 86: System.Diagnostics.Tracing => 113
	i64 u0x2feb4d2fcda05cfd, ; 87: Microsoft.Extensions.Caching.Abstractions.dll => 44
	i64 u0x309ee9eeec09a71e, ; 88: lib_Xamarin.AndroidX.Fragment.dll.so => 80
	i64 u0x310d9651ec86c411, ; 89: Microsoft.Extensions.FileProviders.Embedded => 53
	i64 u0x31195fef5d8fb552, ; 90: _Microsoft.Android.Resource.Designer.dll => 34
	i64 u0x32243413e774362a, ; 91: Xamarin.AndroidX.CardView.dll => 73
	i64 u0x3235427f8d12dae1, ; 92: lib_System.Drawing.Primitives.dll.so => 114
	i64 u0x329753a17a517811, ; 93: fr/Microsoft.Maui.Controls.resources => 8
	i64 u0x32aa989ff07a84ff, ; 94: lib_System.Xml.ReaderWriter.dll.so => 150
	i64 u0x33642d5508314e46, ; 95: Microsoft.Extensions.FileSystemGlobbing.dll => 55
	i64 u0x33829542f112d59b, ; 96: System.Collections.Immutable => 101
	i64 u0x33a31443733849fe, ; 97: lib-es-Microsoft.Maui.Controls.resources.dll.so => 6
	i64 u0x34bd01fd4be06ee3, ; 98: lib_Microsoft.Extensions.FileProviders.Composite.dll.so => 52
	i64 u0x34dfd74fe2afcf37, ; 99: Microsoft.Maui => 63
	i64 u0x34e292762d9615df, ; 100: cs/Microsoft.Maui.Controls.resources.dll => 2
	i64 u0x3508234247f48404, ; 101: Microsoft.Maui.Controls => 61
	i64 u0x353590da528c9d22, ; 102: System.ComponentModel.Annotations => 105
	i64 u0x3549870798b4cd30, ; 103: lib_Xamarin.AndroidX.ViewPager2.dll.so => 94
	i64 u0x355282fc1c909694, ; 104: Microsoft.Extensions.Configuration => 46
	i64 u0x380134e03b1e160a, ; 105: System.Collections.Immutable.dll => 101
	i64 u0x385c17636bb6fe6e, ; 106: Xamarin.AndroidX.CustomView.dll => 78
	i64 u0x393c226616977fdb, ; 107: lib_Xamarin.AndroidX.ViewPager.dll.so => 93
	i64 u0x395e37c3334cf82a, ; 108: lib-ca-Microsoft.Maui.Controls.resources.dll.so => 1
	i64 u0x39c3107c28752af1, ; 109: lib_Microsoft.Extensions.FileProviders.Abstractions.dll.so => 51
	i64 u0x3be6248c2bc7dc8c, ; 110: Microsoft.JSInterop.dll => 60
	i64 u0x3c7c495f58ac5ee9, ; 111: Xamarin.Kotlin.StdLib => 96
	i64 u0x3d46f0b995082740, ; 112: System.Xml.Linq => 149
	i64 u0x3d9c2a242b040a50, ; 113: lib_Xamarin.AndroidX.Core.dll.so => 76
	i64 u0x3da7781d6333a8fe, ; 114: SQLitePCLRaw.batteries_v2 => 66
	i64 u0x3e7f8912b96e5065, ; 115: Microsoft.AspNetCore.Components.WebView.dll => 37
	i64 u0x407a10bb4bf95829, ; 116: lib_Xamarin.AndroidX.Navigation.Common.dll.so => 86
	i64 u0x41cab042be111c34, ; 117: lib_Xamarin.AndroidX.AppCompat.AppCompatResources.dll.so => 72
	i64 u0x43375950ec7c1b6a, ; 118: netstandard.dll => 152
	i64 u0x434c4e1d9284cdae, ; 119: Mono.Android.dll => 156
	i64 u0x43950f84de7cc79a, ; 120: pl/Microsoft.Maui.Controls.resources.dll => 20
	i64 u0x4515080865a951a5, ; 121: Xamarin.Kotlin.StdLib.dll => 96
	i64 u0x453c1277f85cf368, ; 122: lib_Microsoft.EntityFrameworkCore.Abstractions.dll.so => 41
	i64 u0x45c40276a42e283e, ; 123: System.Diagnostics.TraceSource => 112
	i64 u0x45fcc9fd66f25095, ; 124: Microsoft.Extensions.DependencyModel => 50
	i64 u0x46a4213bc97fe5ae, ; 125: lib-ru-Microsoft.Maui.Controls.resources.dll.so => 24
	i64 u0x47358bd471172e1d, ; 126: lib_System.Xml.Linq.dll.so => 149
	i64 u0x47daf4e1afbada10, ; 127: pt/Microsoft.Maui.Controls.resources => 22
	i64 u0x49e952f19a4e2022, ; 128: System.ObjectModel => 131
	i64 u0x4a5667b2462a664b, ; 129: lib_Xamarin.AndroidX.Navigation.UI.dll.so => 89
	i64 u0x4b7b6532ded934b7, ; 130: System.Text.Json => 143
	i64 u0x4c7755cf07ad2d5f, ; 131: System.Net.Http.Json.dll => 125
	i64 u0x4ca014ceac582c86, ; 132: Microsoft.EntityFrameworkCore.Relational.dll => 42
	i64 u0x4cc5f15266470798, ; 133: lib_Xamarin.AndroidX.Loader.dll.so => 85
	i64 u0x4cf6f67dc77aacd2, ; 134: System.Net.NetworkInformation.dll => 127
	i64 u0x4d479f968a05e504, ; 135: System.Linq.Expressions.dll => 121
	i64 u0x4d55a010ffc4faff, ; 136: System.Private.Xml => 134
	i64 u0x4d95fccc1f67c7ca, ; 137: System.Runtime.Loader.dll => 137
	i64 u0x4dcf44c3c9b076a2, ; 138: it/Microsoft.Maui.Controls.resources.dll => 14
	i64 u0x4dd9247f1d2c3235, ; 139: Xamarin.AndroidX.Loader.dll => 85
	i64 u0x4df510084e2a0bae, ; 140: Microsoft.JSInterop => 60
	i64 u0x4e32f00cb0937401, ; 141: Mono.Android.Runtime => 155
	i64 u0x4f21ee6ef9eb527e, ; 142: ca/Microsoft.Maui.Controls.resources => 1
	i64 u0x4fd5f3ee53d0a4f0, ; 143: SQLitePCLRaw.lib.e_sqlite3.android => 68
	i64 u0x5037f0be3c28c7a3, ; 144: lib_Microsoft.Maui.Controls.dll.so => 61
	i64 u0x5131bbe80989093f, ; 145: Xamarin.AndroidX.Lifecycle.ViewModel.Android.dll => 83
	i64 u0x51bb8a2afe774e32, ; 146: System.Drawing => 115
	i64 u0x526ce79eb8e90527, ; 147: lib_System.Net.Primitives.dll.so => 128
	i64 u0x52829f00b4467c38, ; 148: lib_System.Data.Common.dll.so => 110
	i64 u0x529ffe06f39ab8db, ; 149: Xamarin.AndroidX.Core => 76
	i64 u0x52ff996554dbf352, ; 150: Microsoft.Maui.Graphics => 65
	i64 u0x535f7e40e8fef8af, ; 151: lib-sk-Microsoft.Maui.Controls.resources.dll.so => 25
	i64 u0x53a96d5c86c9e194, ; 152: System.Net.NetworkInformation => 127
	i64 u0x53be1038a61e8d44, ; 153: System.Runtime.InteropServices.RuntimeInformation.dll => 135
	i64 u0x53c3014b9437e684, ; 154: lib-zh-HK-Microsoft.Maui.Controls.resources.dll.so => 31
	i64 u0x54795225dd1587af, ; 155: lib_System.Runtime.dll.so => 140
	i64 u0x556e8b63b660ab8b, ; 156: Xamarin.AndroidX.Lifecycle.Common.Jvm.dll => 81
	i64 u0x5588627c9a108ec9, ; 157: System.Collections.Specialized => 103
	i64 u0x571c5cfbec5ae8e2, ; 158: System.Private.Uri => 132
	i64 u0x578cd35c91d7b347, ; 159: lib_SQLitePCLRaw.core.dll.so => 67
	i64 u0x579a06fed6eec900, ; 160: System.Private.CoreLib.dll => 153
	i64 u0x57c542c14049b66d, ; 161: System.Diagnostics.DiagnosticSource => 111
	i64 u0x58601b2dda4a27b9, ; 162: lib-ja-Microsoft.Maui.Controls.resources.dll.so => 15
	i64 u0x58688d9af496b168, ; 163: Microsoft.Extensions.DependencyInjection.dll => 48
	i64 u0x5a89a886ae30258d, ; 164: lib_Xamarin.AndroidX.CoordinatorLayout.dll.so => 75
	i64 u0x5a8f6699f4a1caa9, ; 165: lib_System.Threading.dll.so => 146
	i64 u0x5ae9cd33b15841bf, ; 166: System.ComponentModel => 108
	i64 u0x5b5f0e240a06a2a2, ; 167: da/Microsoft.Maui.Controls.resources.dll => 3
	i64 u0x5c393624b8176517, ; 168: lib_Microsoft.Extensions.Logging.dll.so => 56
	i64 u0x5d25ef991dd9a85c, ; 169: Microsoft.AspNetCore.Components.WebView.Maui.dll => 38
	i64 u0x5db0cbbd1028510e, ; 170: lib_System.Runtime.InteropServices.dll.so => 136
	i64 u0x5db30905d3e5013b, ; 171: Xamarin.AndroidX.Collection.Jvm.dll => 74
	i64 u0x5e467bc8f09ad026, ; 172: System.Collections.Specialized.dll => 103
	i64 u0x5ea92fdb19ec8c4c, ; 173: System.Text.Encodings.Web.dll => 142
	i64 u0x5eb8046dd40e9ac3, ; 174: System.ComponentModel.Primitives => 106
	i64 u0x5f36ccf5c6a57e24, ; 175: System.Xml.ReaderWriter.dll => 150
	i64 u0x5f4294b9b63cb842, ; 176: System.Data.Common => 110
	i64 u0x5f7399e166075632, ; 177: lib_SQLitePCLRaw.lib.e_sqlite3.android.dll.so => 68
	i64 u0x5f9a2d823f664957, ; 178: lib-el-Microsoft.Maui.Controls.resources.dll.so => 5
	i64 u0x609f4b7b63d802d4, ; 179: lib_Microsoft.Extensions.DependencyInjection.dll.so => 48
	i64 u0x60cd4e33d7e60134, ; 180: Xamarin.KotlinX.Coroutines.Core.Jvm => 97
	i64 u0x60f62d786afcf130, ; 181: System.Memory => 124
	i64 u0x61be8d1299194243, ; 182: Microsoft.Maui.Controls.Xaml => 62
	i64 u0x61d2cba29557038f, ; 183: de/Microsoft.Maui.Controls.resources => 4
	i64 u0x61d88f399afb2f45, ; 184: lib_System.Runtime.Loader.dll.so => 137
	i64 u0x622eef6f9e59068d, ; 185: System.Private.CoreLib => 153
	i64 u0x63f1f6883c1e23c2, ; 186: lib_System.Collections.Immutable.dll.so => 101
	i64 u0x6400f68068c1e9f1, ; 187: Xamarin.Google.Android.Material.dll => 95
	i64 u0x65ecac39144dd3cc, ; 188: Microsoft.Maui.Controls.dll => 61
	i64 u0x65ece51227bfa724, ; 189: lib_System.Runtime.Numerics.dll.so => 138
	i64 u0x6692e924eade1b29, ; 190: lib_System.Console.dll.so => 109
	i64 u0x66a4e5c6a3fb0bae, ; 191: lib_Xamarin.AndroidX.Lifecycle.ViewModel.Android.dll.so => 83
	i64 u0x66d13304ce1a3efa, ; 192: Xamarin.AndroidX.CursorAdapter => 77
	i64 u0x68558ec653afa616, ; 193: lib-da-Microsoft.Maui.Controls.resources.dll.so => 3
	i64 u0x6872ec7a2e36b1ac, ; 194: System.Drawing.Primitives.dll => 114
	i64 u0x68fbbbe2eb455198, ; 195: System.Formats.Asn1 => 116
	i64 u0x69063fc0ba8e6bdd, ; 196: he/Microsoft.Maui.Controls.resources.dll => 9
	i64 u0x699dffb2427a2d71, ; 197: SQLitePCLRaw.lib.e_sqlite3.android.dll => 68
	i64 u0x6a4d7577b2317255, ; 198: System.Runtime.InteropServices.dll => 136
	i64 u0x6ace3b74b15ee4a4, ; 199: nb/Microsoft.Maui.Controls.resources => 18
	i64 u0x6c9ce83bc9f3b5d6, ; 200: AdmBeachApp => 99
	i64 u0x6d12bfaa99c72b1f, ; 201: lib_Microsoft.Maui.Graphics.dll.so => 65
	i64 u0x6d79993361e10ef2, ; 202: Microsoft.Extensions.Primitives => 59
	i64 u0x6d86d56b84c8eb71, ; 203: lib_Xamarin.AndroidX.CursorAdapter.dll.so => 77
	i64 u0x6d9bea6b3e895cf7, ; 204: Microsoft.Extensions.Primitives.dll => 59
	i64 u0x6e25a02c3833319a, ; 205: lib_Xamarin.AndroidX.Navigation.Fragment.dll.so => 87
	i64 u0x6fd2265da78b93a4, ; 206: lib_Microsoft.Maui.dll.so => 63
	i64 u0x6fdfc7de82c33008, ; 207: cs/Microsoft.Maui.Controls.resources => 2
	i64 u0x6ffc4967cc47ba57, ; 208: System.IO.FileSystem.Watcher.dll => 119
	i64 u0x70e99f48c05cb921, ; 209: tr/Microsoft.Maui.Controls.resources.dll => 28
	i64 u0x70fd3deda22442d2, ; 210: lib-nb-Microsoft.Maui.Controls.resources.dll.so => 18
	i64 u0x71a495ea3761dde8, ; 211: lib-it-Microsoft.Maui.Controls.resources.dll.so => 14
	i64 u0x71ad672adbe48f35, ; 212: System.ComponentModel.Primitives.dll => 106
	i64 u0x72b1fb4109e08d7b, ; 213: lib-hr-Microsoft.Maui.Controls.resources.dll.so => 11
	i64 u0x73e4ce94e2eb6ffc, ; 214: lib_System.Memory.dll.so => 124
	i64 u0x73f2645914262879, ; 215: lib_Microsoft.EntityFrameworkCore.Sqlite.dll.so => 43
	i64 u0x755a91767330b3d4, ; 216: lib_Microsoft.Extensions.Configuration.dll.so => 46
	i64 u0x76012e7334db86e5, ; 217: lib_Xamarin.AndroidX.SavedState.dll.so => 91
	i64 u0x76ca07b878f44da0, ; 218: System.Runtime.Numerics.dll => 138
	i64 u0x780bc73597a503a9, ; 219: lib-ms-Microsoft.Maui.Controls.resources.dll.so => 17
	i64 u0x783606d1e53e7a1a, ; 220: th/Microsoft.Maui.Controls.resources.dll => 27
	i64 u0x78a45e51311409b6, ; 221: Xamarin.AndroidX.Fragment.dll => 80
	i64 u0x7a71889545dcdb00, ; 222: lib_Microsoft.AspNetCore.Components.WebView.dll.so => 37
	i64 u0x7adb8da2ac89b647, ; 223: fi/Microsoft.Maui.Controls.resources.dll => 7
	i64 u0x7b150145c0a9058c, ; 224: Microsoft.Data.Sqlite => 39
	i64 u0x7bef86a4335c4870, ; 225: System.ComponentModel.TypeConverter => 107
	i64 u0x7c0820144cd34d6a, ; 226: sk/Microsoft.Maui.Controls.resources.dll => 25
	i64 u0x7c2a0bd1e0f988fc, ; 227: lib-de-Microsoft.Maui.Controls.resources.dll.so => 4
	i64 u0x7d649b75d580bb42, ; 228: ms/Microsoft.Maui.Controls.resources.dll => 17
	i64 u0x7d8ee2bdc8e3aad1, ; 229: System.Numerics.Vectors => 130
	i64 u0x7dfc3d6d9d8d7b70, ; 230: System.Collections => 104
	i64 u0x7e2e564fa2f76c65, ; 231: lib_System.Diagnostics.Tracing.dll.so => 113
	i64 u0x7e946809d6008ef2, ; 232: lib_System.ObjectModel.dll.so => 131
	i64 u0x7ecc13347c8fd849, ; 233: lib_System.ComponentModel.dll.so => 108
	i64 u0x7f00ddd9b9ca5a13, ; 234: Xamarin.AndroidX.ViewPager.dll => 93
	i64 u0x7f9351cd44b1273f, ; 235: Microsoft.Extensions.Configuration.Abstractions => 47
	i64 u0x7fbd557c99b3ce6f, ; 236: lib_Xamarin.AndroidX.Lifecycle.LiveData.Core.dll.so => 82
	i64 u0x80fa55b6d1b0be99, ; 237: SQLitePCLRaw.provider.e_sqlite3 => 69
	i64 u0x8101a73bd4533440, ; 238: Microsoft.AspNetCore.Components.Web => 36
	i64 u0x812c069d5cdecc17, ; 239: System.dll => 151
	i64 u0x81ab745f6c0f5ce6, ; 240: zh-Hant/Microsoft.Maui.Controls.resources => 33
	i64 u0x8277f2be6b5ce05f, ; 241: Xamarin.AndroidX.AppCompat => 71
	i64 u0x828f06563b30bc50, ; 242: lib_Xamarin.AndroidX.CardView.dll.so => 73
	i64 u0x82df8f5532a10c59, ; 243: lib_System.Drawing.dll.so => 115
	i64 u0x82f6403342e12049, ; 244: uk/Microsoft.Maui.Controls.resources => 29
	i64 u0x83c14ba66c8e2b8c, ; 245: zh-Hans/Microsoft.Maui.Controls.resources => 32
	i64 u0x83de69860da6cbdd, ; 246: Microsoft.Extensions.FileProviders.Composite => 52
	i64 u0x84cd5cdec0f54bcc, ; 247: lib_Microsoft.EntityFrameworkCore.Relational.dll.so => 42
	i64 u0x86a909228dc7657b, ; 248: lib-zh-Hant-Microsoft.Maui.Controls.resources.dll.so => 33
	i64 u0x86b3e00c36b84509, ; 249: Microsoft.Extensions.Configuration.dll => 46
	i64 u0x8704193f462e892e, ; 250: lib_Microsoft.Extensions.FileSystemGlobbing.dll.so => 55
	i64 u0x87c4b8a492b176ad, ; 251: Microsoft.EntityFrameworkCore.Abstractions => 41
	i64 u0x87c69b87d9283884, ; 252: lib_System.Threading.Thread.dll.so => 145
	i64 u0x87f6569b25707834, ; 253: System.IO.Compression.Brotli.dll => 117
	i64 u0x8842b3a5d2d3fb36, ; 254: Microsoft.Maui.Essentials => 64
	i64 u0x88bda98e0cffb7a9, ; 255: lib_Xamarin.KotlinX.Coroutines.Core.Jvm.dll.so => 97
	i64 u0x8930322c7bd8f768, ; 256: netstandard => 152
	i64 u0x897a606c9e39c75f, ; 257: lib_System.ComponentModel.Primitives.dll.so => 106
	i64 u0x89c5188089ec2cd5, ; 258: lib_System.Runtime.InteropServices.RuntimeInformation.dll.so => 135
	i64 u0x8a399a706fcbce4b, ; 259: Microsoft.Extensions.Caching.Abstractions => 44
	i64 u0x8ad229ea26432ee2, ; 260: Xamarin.AndroidX.Loader => 85
	i64 u0x8b4ff5d0fdd5faa1, ; 261: lib_System.Diagnostics.DiagnosticSource.dll.so => 111
	i64 u0x8b9ceca7acae3451, ; 262: lib-he-Microsoft.Maui.Controls.resources.dll.so => 9
	i64 u0x8c575135aa1ccef4, ; 263: Microsoft.Extensions.FileProviders.Abstractions => 51
	i64 u0x8d0f420977c2c1c7, ; 264: Xamarin.AndroidX.CursorAdapter.dll => 77
	i64 u0x8d52a25632e81824, ; 265: Microsoft.EntityFrameworkCore.Sqlite.dll => 43
	i64 u0x8d7b8ab4b3310ead, ; 266: System.Threading => 146
	i64 u0x8da188285aadfe8e, ; 267: System.Collections.Concurrent => 100
	i64 u0x8ed807bfe9858dfc, ; 268: Xamarin.AndroidX.Navigation.Common => 86
	i64 u0x8ee08b8194a30f48, ; 269: lib-hi-Microsoft.Maui.Controls.resources.dll.so => 10
	i64 u0x8ef7601039857a44, ; 270: lib-ro-Microsoft.Maui.Controls.resources.dll.so => 23
	i64 u0x8ef9414937d93a0a, ; 271: SQLitePCLRaw.core.dll => 67
	i64 u0x8f32c6f611f6ffab, ; 272: pt/Microsoft.Maui.Controls.resources.dll => 22
	i64 u0x8f8829d21c8985a4, ; 273: lib-pt-BR-Microsoft.Maui.Controls.resources.dll.so => 21
	i64 u0x8fd27d934d7b3a55, ; 274: SQLitePCLRaw.core => 67
	i64 u0x90263f8448b8f572, ; 275: lib_System.Diagnostics.TraceSource.dll.so => 112
	i64 u0x903101b46fb73a04, ; 276: _Microsoft.Android.Resource.Designer => 34
	i64 u0x90393bd4865292f3, ; 277: lib_System.IO.Compression.dll.so => 118
	i64 u0x90634f86c5ebe2b5, ; 278: Xamarin.AndroidX.Lifecycle.ViewModel.Android => 83
	i64 u0x907b636704ad79ef, ; 279: lib_Microsoft.Maui.Controls.Xaml.dll.so => 62
	i64 u0x91418dc638b29e68, ; 280: lib_Xamarin.AndroidX.CustomView.dll.so => 78
	i64 u0x9157bd523cd7ed36, ; 281: lib_System.Text.Json.dll.so => 143
	i64 u0x91a74f07b30d37e2, ; 282: System.Linq.dll => 123
	i64 u0x91fa41a87223399f, ; 283: ca/Microsoft.Maui.Controls.resources.dll => 1
	i64 u0x93cfa73ab28d6e35, ; 284: ms/Microsoft.Maui.Controls.resources => 17
	i64 u0x944077d8ca3c6580, ; 285: System.IO.Compression.dll => 118
	i64 u0x95a4e1212971e81e, ; 286: AdmBeachApp.dll => 99
	i64 u0x967fc325e09bfa8c, ; 287: es/Microsoft.Maui.Controls.resources => 6
	i64 u0x9732d8dbddea3d9a, ; 288: id/Microsoft.Maui.Controls.resources => 13
	i64 u0x978be80e5210d31b, ; 289: Microsoft.Maui.Graphics.dll => 65
	i64 u0x97b8c771ea3e4220, ; 290: System.ComponentModel.dll => 108
	i64 u0x97e144c9d3c6976e, ; 291: System.Collections.Concurrent.dll => 100
	i64 u0x988a5b66cfbed724, ; 292: lib_AdmBeachApp.dll.so => 99
	i64 u0x991d510397f92d9d, ; 293: System.Linq.Expressions => 121
	i64 u0x99a00ca5270c6878, ; 294: Xamarin.AndroidX.Navigation.Runtime => 88
	i64 u0x99cdc6d1f2d3a72f, ; 295: ko/Microsoft.Maui.Controls.resources.dll => 16
	i64 u0x9b211a749105beac, ; 296: System.Transactions.Local => 147
	i64 u0x9d5dbcf5a48583fe, ; 297: lib_Xamarin.AndroidX.Activity.dll.so => 70
	i64 u0x9d74dee1a7725f34, ; 298: Microsoft.Extensions.Configuration.Abstractions.dll => 47
	i64 u0x9e4534b6adaf6e84, ; 299: nl/Microsoft.Maui.Controls.resources => 19
	i64 u0x9eaf1efdf6f7267e, ; 300: Xamarin.AndroidX.Navigation.Common.dll => 86
	i64 u0x9ef542cf1f78c506, ; 301: Xamarin.AndroidX.Lifecycle.LiveData.Core => 82
	i64 u0x9fbb2961ca18e5c2, ; 302: Microsoft.Extensions.FileProviders.Physical.dll => 54
	i64 u0xa0d8259f4cc284ec, ; 303: lib_System.Security.Cryptography.dll.so => 141
	i64 u0xa1440773ee9d341e, ; 304: Xamarin.Google.Android.Material => 95
	i64 u0xa1b9d7c27f47219f, ; 305: Xamarin.AndroidX.Navigation.UI.dll => 89
	i64 u0xa2572680829d2c7c, ; 306: System.IO.Pipelines.dll => 120
	i64 u0xa3b8104115a36bf6, ; 307: lib_Microsoft.Extensions.FileProviders.Embedded.dll.so => 53
	i64 u0xa46aa1eaa214539b, ; 308: ko/Microsoft.Maui.Controls.resources => 16
	i64 u0xa4edc8f2ceae241a, ; 309: System.Data.Common.dll => 110
	i64 u0xa5494f40f128ce6a, ; 310: System.Runtime.Serialization.Formatters.dll => 139
	i64 u0xa5b7152421ed6d98, ; 311: lib_System.IO.FileSystem.Watcher.dll.so => 119
	i64 u0xa5e599d1e0524750, ; 312: System.Numerics.Vectors.dll => 130
	i64 u0xa5f1ba49b85dd355, ; 313: System.Security.Cryptography.dll => 141
	i64 u0xa67dbee13e1df9ca, ; 314: Xamarin.AndroidX.SavedState.dll => 91
	i64 u0xa68a420042bb9b1f, ; 315: Xamarin.AndroidX.DrawerLayout.dll => 79
	i64 u0xa78ce3745383236a, ; 316: Xamarin.AndroidX.Lifecycle.Common.Jvm => 81
	i64 u0xa7c31b56b4dc7b33, ; 317: hu/Microsoft.Maui.Controls.resources => 12
	i64 u0xa82fd211eef00a5b, ; 318: Microsoft.Extensions.FileProviders.Physical => 54
	i64 u0xaa2219c8e3449ff5, ; 319: Microsoft.Extensions.Logging.Abstractions => 57
	i64 u0xaa443ac34067eeef, ; 320: System.Private.Xml.dll => 134
	i64 u0xaa52de307ef5d1dd, ; 321: System.Net.Http => 126
	i64 u0xaaaf86367285a918, ; 322: Microsoft.Extensions.DependencyInjection.Abstractions.dll => 49
	i64 u0xaaf84bb3f052a265, ; 323: el/Microsoft.Maui.Controls.resources => 5
	i64 u0xab9c1b2687d86b0b, ; 324: lib_System.Linq.Expressions.dll.so => 121
	i64 u0xac2af3fa195a15ce, ; 325: System.Runtime.Numerics => 138
	i64 u0xac5376a2a538dc10, ; 326: Xamarin.AndroidX.Lifecycle.LiveData.Core.dll => 82
	i64 u0xacd46e002c3ccb97, ; 327: ro/Microsoft.Maui.Controls.resources => 23
	i64 u0xad89c07347f1bad6, ; 328: nl/Microsoft.Maui.Controls.resources.dll => 19
	i64 u0xadbb53caf78a79d2, ; 329: System.Web.HttpUtility => 148
	i64 u0xadc90ab061a9e6e4, ; 330: System.ComponentModel.TypeConverter.dll => 107
	i64 u0xae282bcd03739de7, ; 331: Java.Interop => 154
	i64 u0xae53579c90db1107, ; 332: System.ObjectModel.dll => 131
	i64 u0xaf12fb8133ac3fbb, ; 333: Microsoft.EntityFrameworkCore.Sqlite => 43
	i64 u0xafe29f45095518e7, ; 334: lib_Xamarin.AndroidX.Lifecycle.ViewModelSavedState.dll.so => 84
	i64 u0xb05cc42cd94c6d9d, ; 335: lib-sv-Microsoft.Maui.Controls.resources.dll.so => 26
	i64 u0xb0bb43dc52ea59f9, ; 336: System.Diagnostics.Tracing.dll => 113
	i64 u0xb1ccbf6243328d1c, ; 337: Microsoft.AspNetCore.Components => 35
	i64 u0xb220631954820169, ; 338: System.Text.RegularExpressions => 144
	i64 u0xb2a3f67f3bf29fce, ; 339: da/Microsoft.Maui.Controls.resources => 3
	i64 u0xb3f0a0fcda8d3ebc, ; 340: Xamarin.AndroidX.CardView => 73
	i64 u0xb46be1aa6d4fff93, ; 341: hi/Microsoft.Maui.Controls.resources => 10
	i64 u0xb477491be13109d8, ; 342: ar/Microsoft.Maui.Controls.resources => 0
	i64 u0xb4bd7015ecee9d86, ; 343: System.IO.Pipelines => 120
	i64 u0xb5c7fcdafbc67ee4, ; 344: Microsoft.Extensions.Logging.Abstractions.dll => 57
	i64 u0xb7212c4683a94afe, ; 345: System.Drawing.Primitives => 114
	i64 u0xb7b7753d1f319409, ; 346: sv/Microsoft.Maui.Controls.resources => 26
	i64 u0xb81a2c6e0aee50fe, ; 347: lib_System.Private.CoreLib.dll.so => 153
	i64 u0xb9f64d3b230def68, ; 348: lib-pt-Microsoft.Maui.Controls.resources.dll.so => 22
	i64 u0xb9fc3c8a556e3691, ; 349: ja/Microsoft.Maui.Controls.resources => 15
	i64 u0xba48785529705af9, ; 350: System.Collections.dll => 104
	i64 u0xbaf762c4825c14e9, ; 351: Microsoft.AspNetCore.Components.WebView => 37
	i64 u0xbbd180354b67271a, ; 352: System.Runtime.Serialization.Formatters => 139
	i64 u0xbc22a245dab70cb4, ; 353: lib_SQLitePCLRaw.provider.e_sqlite3.dll.so => 69
	i64 u0xbd0e2c0d55246576, ; 354: System.Net.Http.dll => 126
	i64 u0xbd437a2cdb333d0d, ; 355: Xamarin.AndroidX.ViewPager2 => 94
	i64 u0xbee38d4a88835966, ; 356: Xamarin.AndroidX.AppCompat.AppCompatResources => 72
	i64 u0xbfc1e1fb3095f2b3, ; 357: lib_System.Net.Http.Json.dll.so => 125
	i64 u0xc040a4ab55817f58, ; 358: ar/Microsoft.Maui.Controls.resources.dll => 0
	i64 u0xc0d928351ab5ca77, ; 359: System.Console.dll => 109
	i64 u0xc12b8b3afa48329c, ; 360: lib_System.Linq.dll.so => 123
	i64 u0xc1c2cb7af77b8858, ; 361: Microsoft.EntityFrameworkCore => 40
	i64 u0xc1ff9ae3cdb6e1e6, ; 362: Xamarin.AndroidX.Activity.dll => 70
	i64 u0xc28c50f32f81cc73, ; 363: ja/Microsoft.Maui.Controls.resources.dll => 15
	i64 u0xc2a3bca55b573141, ; 364: System.IO.FileSystem.Watcher => 119
	i64 u0xc2bcfec99f69365e, ; 365: Xamarin.AndroidX.ViewPager2.dll => 94
	i64 u0xc3492f8f90f96ce4, ; 366: lib_Microsoft.Extensions.DependencyModel.dll.so => 50
	i64 u0xc472ce300460ccb6, ; 367: Microsoft.EntityFrameworkCore.dll => 40
	i64 u0xc4d3858ed4d08512, ; 368: Xamarin.AndroidX.Lifecycle.ViewModelSavedState.dll => 84
	i64 u0xc4d69851fe06342f, ; 369: lib_Microsoft.Extensions.Caching.Memory.dll.so => 45
	i64 u0xc50fded0ded1418c, ; 370: lib_System.ComponentModel.TypeConverter.dll.so => 107
	i64 u0xc519125d6bc8fb11, ; 371: lib_System.Net.Requests.dll.so => 129
	i64 u0xc5293b19e4dc230e, ; 372: Xamarin.AndroidX.Navigation.Fragment => 87
	i64 u0xc5325b2fcb37446f, ; 373: lib_System.Private.Xml.dll.so => 134
	i64 u0xc5a0f4b95a699af7, ; 374: lib_System.Private.Uri.dll.so => 132
	i64 u0xc7ce851898a4548e, ; 375: lib_System.Web.HttpUtility.dll.so => 148
	i64 u0xc858a28d9ee5a6c5, ; 376: lib_System.Collections.Specialized.dll.so => 103
	i64 u0xca3110fea81c8916, ; 377: Microsoft.AspNetCore.Components.Web.dll => 36
	i64 u0xca32340d8d54dcd5, ; 378: Microsoft.Extensions.Caching.Memory.dll => 45
	i64 u0xca3a723e7342c5b6, ; 379: lib-tr-Microsoft.Maui.Controls.resources.dll.so => 28
	i64 u0xcab3493c70141c2d, ; 380: pl/Microsoft.Maui.Controls.resources => 20
	i64 u0xcacfddc9f7c6de76, ; 381: ro/Microsoft.Maui.Controls.resources.dll => 23
	i64 u0xcb45618372c47127, ; 382: Microsoft.EntityFrameworkCore.Relational => 42
	i64 u0xcbd4fdd9cef4a294, ; 383: lib__Microsoft.Android.Resource.Designer.dll.so => 34
	i64 u0xcc2876b32ef2794c, ; 384: lib_System.Text.RegularExpressions.dll.so => 144
	i64 u0xcc5c3bb714c4561e, ; 385: Xamarin.KotlinX.Coroutines.Core.Jvm.dll => 97
	i64 u0xcc76886e09b88260, ; 386: Xamarin.KotlinX.Serialization.Core.Jvm.dll => 98
	i64 u0xccf25c4b634ccd3a, ; 387: zh-Hans/Microsoft.Maui.Controls.resources.dll => 32
	i64 u0xcd10a42808629144, ; 388: System.Net.Requests => 129
	i64 u0xcdd0c48b6937b21c, ; 389: Xamarin.AndroidX.SwipeRefreshLayout => 92
	i64 u0xcf23d8093f3ceadf, ; 390: System.Diagnostics.DiagnosticSource.dll => 111
	i64 u0xcf8fc898f98b0d34, ; 391: System.Private.Xml.Linq => 133
	i64 u0xd1194e1d8a8de83c, ; 392: lib_Xamarin.AndroidX.Lifecycle.Common.Jvm.dll.so => 81
	i64 u0xd2505d8abeed6983, ; 393: lib_Microsoft.AspNetCore.Components.Web.dll.so => 36
	i64 u0xd333d0af9e423810, ; 394: System.Runtime.InteropServices => 136
	i64 u0xd3426d966bb704f5, ; 395: Xamarin.AndroidX.AppCompat.AppCompatResources.dll => 72
	i64 u0xd3651b6fc3125825, ; 396: System.Private.Uri.dll => 132
	i64 u0xd373685349b1fe8b, ; 397: Microsoft.Extensions.Logging.dll => 56
	i64 u0xd3e4c8d6a2d5d470, ; 398: it/Microsoft.Maui.Controls.resources => 14
	i64 u0xd42655883bb8c19f, ; 399: Microsoft.EntityFrameworkCore.Abstractions.dll => 41
	i64 u0xd4645626dffec99d, ; 400: lib_Microsoft.Extensions.DependencyInjection.Abstractions.dll.so => 49
	i64 u0xd46b4a8758d1f3ee, ; 401: Microsoft.Extensions.FileProviders.Composite.dll => 52
	i64 u0xd5507e11a2b2839f, ; 402: Xamarin.AndroidX.Lifecycle.ViewModelSavedState => 84
	i64 u0xd6694f8359737e4e, ; 403: Xamarin.AndroidX.SavedState => 91
	i64 u0xd6d21782156bc35b, ; 404: Xamarin.AndroidX.SwipeRefreshLayout.dll => 92
	i64 u0xd72329819cbbbc44, ; 405: lib_Microsoft.Extensions.Configuration.Abstractions.dll.so => 47
	i64 u0xd7b3764ada9d341d, ; 406: lib_Microsoft.Extensions.Logging.Abstractions.dll.so => 57
	i64 u0xda1dfa4c534a9251, ; 407: Microsoft.Extensions.DependencyInjection => 48
	i64 u0xdad05a11827959a3, ; 408: System.Collections.NonGeneric.dll => 102
	i64 u0xdb5383ab5865c007, ; 409: lib-vi-Microsoft.Maui.Controls.resources.dll.so => 30
	i64 u0xdbeda89f832aa805, ; 410: vi/Microsoft.Maui.Controls.resources.dll => 30
	i64 u0xdbf2a779fbc3ac31, ; 411: System.Transactions.Local.dll => 147
	i64 u0xdbf9607a441b4505, ; 412: System.Linq => 123
	i64 u0xdc75032002d1a212, ; 413: lib_System.Transactions.Local.dll.so => 147
	i64 u0xdca8be7403f92d4f, ; 414: lib_System.Linq.Queryable.dll.so => 122
	i64 u0xdce2c53525640bf3, ; 415: Microsoft.Extensions.Logging => 56
	i64 u0xdd2b722d78ef5f43, ; 416: System.Runtime.dll => 140
	i64 u0xdd67031857c72f96, ; 417: lib_System.Text.Encodings.Web.dll.so => 142
	i64 u0xdde30e6b77aa6f6c, ; 418: lib-zh-Hans-Microsoft.Maui.Controls.resources.dll.so => 32
	i64 u0xde8769ebda7d8647, ; 419: hr/Microsoft.Maui.Controls.resources.dll => 11
	i64 u0xe0142572c095a480, ; 420: Xamarin.AndroidX.AppCompat.dll => 71
	i64 u0xe02f89350ec78051, ; 421: Xamarin.AndroidX.CoordinatorLayout.dll => 75
	i64 u0xe192a588d4410686, ; 422: lib_System.IO.Pipelines.dll.so => 120
	i64 u0xe1a08bd3fa539e0d, ; 423: System.Runtime.Loader => 137
	i64 u0xe1b52f9f816c70ef, ; 424: System.Private.Xml.Linq.dll => 133
	i64 u0xe2420585aeceb728, ; 425: System.Net.Requests.dll => 129
	i64 u0xe29b73bc11392966, ; 426: lib-id-Microsoft.Maui.Controls.resources.dll.so => 13
	i64 u0xe31089e70e4e84ee, ; 427: Microsoft.AspNetCore.Components.WebView.Maui => 38
	i64 u0xe3811d68d4fe8463, ; 428: pt-BR/Microsoft.Maui.Controls.resources.dll => 21
	i64 u0xe494f7ced4ecd10a, ; 429: hu/Microsoft.Maui.Controls.resources.dll => 12
	i64 u0xe4a9b1e40d1e8917, ; 430: lib-fi-Microsoft.Maui.Controls.resources.dll.so => 7
	i64 u0xe5434e8a119ceb69, ; 431: lib_Mono.Android.dll.so => 156
	i64 u0xe89a2a9ef110899b, ; 432: System.Drawing.dll => 115
	i64 u0xe9772100456fb4b4, ; 433: Microsoft.AspNetCore.Components.dll => 35
	i64 u0xea154e342c6ac70f, ; 434: Microsoft.Extensions.FileProviders.Embedded.dll => 53
	i64 u0xedc632067fb20ff3, ; 435: System.Memory.dll => 124
	i64 u0xedc8e4ca71a02a8b, ; 436: Xamarin.AndroidX.Navigation.Runtime.dll => 88
	i64 u0xeeb7ebb80150501b, ; 437: lib_Xamarin.AndroidX.Collection.Jvm.dll.so => 74
	i64 u0xef72742e1bcca27a, ; 438: Microsoft.Maui.Essentials.dll => 64
	i64 u0xefec0b7fdc57ec42, ; 439: Xamarin.AndroidX.Activity => 70
	i64 u0xf00c29406ea45e19, ; 440: es/Microsoft.Maui.Controls.resources.dll => 6
	i64 u0xf11b621fc87b983f, ; 441: Microsoft.Maui.Controls.Xaml.dll => 62
	i64 u0xf1c4b4005493d871, ; 442: System.Formats.Asn1.dll => 116
	i64 u0xf238bd79489d3a96, ; 443: lib-nl-Microsoft.Maui.Controls.resources.dll.so => 19
	i64 u0xf37221fda4ef8830, ; 444: lib_Xamarin.Google.Android.Material.dll.so => 95
	i64 u0xf3ddfe05336abf29, ; 445: System => 151
	i64 u0xf4103170a1de5bd0, ; 446: System.Linq.Queryable.dll => 122
	i64 u0xf4c1dd70a5496a17, ; 447: System.IO.Compression => 118
	i64 u0xf6077741019d7428, ; 448: Xamarin.AndroidX.CoordinatorLayout => 75
	i64 u0xf77b20923f07c667, ; 449: de/Microsoft.Maui.Controls.resources.dll => 4
	i64 u0xf7e2cac4c45067b3, ; 450: lib_System.Numerics.Vectors.dll.so => 130
	i64 u0xf7e74930e0e3d214, ; 451: zh-HK/Microsoft.Maui.Controls.resources.dll => 31
	i64 u0xf84773b5c81e3cef, ; 452: lib-uk-Microsoft.Maui.Controls.resources.dll.so => 29
	i64 u0xf8aac5ea82de1348, ; 453: System.Linq.Queryable => 122
	i64 u0xf8e045dc345b2ea3, ; 454: lib_Xamarin.AndroidX.RecyclerView.dll.so => 90
	i64 u0xf915dc29808193a1, ; 455: System.Web.HttpUtility.dll => 148
	i64 u0xf96c777a2a0686f4, ; 456: hi/Microsoft.Maui.Controls.resources.dll => 10
	i64 u0xf9eec5bb3a6aedc6, ; 457: Microsoft.Extensions.Options => 58
	i64 u0xfa504dfa0f097d72, ; 458: Microsoft.Extensions.FileProviders.Abstractions.dll => 51
	i64 u0xfa5ed7226d978949, ; 459: lib-ar-Microsoft.Maui.Controls.resources.dll.so => 0
	i64 u0xfa645d91e9fc4cba, ; 460: System.Threading.Thread => 145
	i64 u0xfb022853d73b7fa5, ; 461: lib_SQLitePCLRaw.batteries_v2.dll.so => 66
	i64 u0xfbf0a31c9fc34bc4, ; 462: lib_System.Net.Http.dll.so => 126
	i64 u0xfc6b7527cc280b3f, ; 463: lib_System.Runtime.Serialization.Formatters.dll.so => 139
	i64 u0xfc719aec26adf9d9, ; 464: Xamarin.AndroidX.Navigation.Fragment.dll => 87
	i64 u0xfd22f00870e40ae0, ; 465: lib_Xamarin.AndroidX.DrawerLayout.dll.so => 79
	i64 u0xfd2e866c678cac90, ; 466: lib_Microsoft.AspNetCore.Components.WebView.Maui.dll.so => 38
	i64 u0xfd49b3c1a76e2748, ; 467: System.Runtime.InteropServices.RuntimeInformation => 135
	i64 u0xfd583f7657b6a1cb, ; 468: Xamarin.AndroidX.Fragment => 80
	i64 u0xfeae9952cf03b8cb, ; 469: tr/Microsoft.Maui.Controls.resources => 28
	i64 u0xff9b54613e0d2cc8 ; 470: System.Net.Http.Json => 125
], align 16

@assembly_image_cache_indices = dso_local local_unnamed_addr constant [471 x i32] [
	i32 92, i32 105, i32 88, i32 45, i32 155, i32 71, i32 69, i32 24,
	i32 2, i32 30, i32 128, i32 90, i32 39, i32 104, i32 63, i32 39,
	i32 31, i32 149, i32 74, i32 35, i32 24, i32 102, i32 79, i32 105,
	i32 58, i32 102, i32 141, i32 44, i32 25, i32 98, i32 93, i32 21,
	i32 156, i32 64, i32 78, i32 117, i32 90, i32 8, i32 154, i32 9,
	i32 49, i32 50, i32 152, i32 12, i32 142, i32 98, i32 18, i32 100,
	i32 151, i32 27, i32 54, i32 155, i32 89, i32 16, i32 58, i32 117,
	i32 140, i32 27, i32 145, i32 40, i32 109, i32 76, i32 8, i32 66,
	i32 96, i32 59, i32 13, i32 11, i32 154, i32 128, i32 29, i32 127,
	i32 112, i32 7, i32 144, i32 116, i32 33, i32 55, i32 20, i32 133,
	i32 146, i32 26, i32 143, i32 5, i32 60, i32 150, i32 113, i32 44,
	i32 80, i32 53, i32 34, i32 73, i32 114, i32 8, i32 150, i32 55,
	i32 101, i32 6, i32 52, i32 63, i32 2, i32 61, i32 105, i32 94,
	i32 46, i32 101, i32 78, i32 93, i32 1, i32 51, i32 60, i32 96,
	i32 149, i32 76, i32 66, i32 37, i32 86, i32 72, i32 152, i32 156,
	i32 20, i32 96, i32 41, i32 112, i32 50, i32 24, i32 149, i32 22,
	i32 131, i32 89, i32 143, i32 125, i32 42, i32 85, i32 127, i32 121,
	i32 134, i32 137, i32 14, i32 85, i32 60, i32 155, i32 1, i32 68,
	i32 61, i32 83, i32 115, i32 128, i32 110, i32 76, i32 65, i32 25,
	i32 127, i32 135, i32 31, i32 140, i32 81, i32 103, i32 132, i32 67,
	i32 153, i32 111, i32 15, i32 48, i32 75, i32 146, i32 108, i32 3,
	i32 56, i32 38, i32 136, i32 74, i32 103, i32 142, i32 106, i32 150,
	i32 110, i32 68, i32 5, i32 48, i32 97, i32 124, i32 62, i32 4,
	i32 137, i32 153, i32 101, i32 95, i32 61, i32 138, i32 109, i32 83,
	i32 77, i32 3, i32 114, i32 116, i32 9, i32 68, i32 136, i32 18,
	i32 99, i32 65, i32 59, i32 77, i32 59, i32 87, i32 63, i32 2,
	i32 119, i32 28, i32 18, i32 14, i32 106, i32 11, i32 124, i32 43,
	i32 46, i32 91, i32 138, i32 17, i32 27, i32 80, i32 37, i32 7,
	i32 39, i32 107, i32 25, i32 4, i32 17, i32 130, i32 104, i32 113,
	i32 131, i32 108, i32 93, i32 47, i32 82, i32 69, i32 36, i32 151,
	i32 33, i32 71, i32 73, i32 115, i32 29, i32 32, i32 52, i32 42,
	i32 33, i32 46, i32 55, i32 41, i32 145, i32 117, i32 64, i32 97,
	i32 152, i32 106, i32 135, i32 44, i32 85, i32 111, i32 9, i32 51,
	i32 77, i32 43, i32 146, i32 100, i32 86, i32 10, i32 23, i32 67,
	i32 22, i32 21, i32 67, i32 112, i32 34, i32 118, i32 83, i32 62,
	i32 78, i32 143, i32 123, i32 1, i32 17, i32 118, i32 99, i32 6,
	i32 13, i32 65, i32 108, i32 100, i32 99, i32 121, i32 88, i32 16,
	i32 147, i32 70, i32 47, i32 19, i32 86, i32 82, i32 54, i32 141,
	i32 95, i32 89, i32 120, i32 53, i32 16, i32 110, i32 139, i32 119,
	i32 130, i32 141, i32 91, i32 79, i32 81, i32 12, i32 54, i32 57,
	i32 134, i32 126, i32 49, i32 5, i32 121, i32 138, i32 82, i32 23,
	i32 19, i32 148, i32 107, i32 154, i32 131, i32 43, i32 84, i32 26,
	i32 113, i32 35, i32 144, i32 3, i32 73, i32 10, i32 0, i32 120,
	i32 57, i32 114, i32 26, i32 153, i32 22, i32 15, i32 104, i32 37,
	i32 139, i32 69, i32 126, i32 94, i32 72, i32 125, i32 0, i32 109,
	i32 123, i32 40, i32 70, i32 15, i32 119, i32 94, i32 50, i32 40,
	i32 84, i32 45, i32 107, i32 129, i32 87, i32 134, i32 132, i32 148,
	i32 103, i32 36, i32 45, i32 28, i32 20, i32 23, i32 42, i32 34,
	i32 144, i32 97, i32 98, i32 32, i32 129, i32 92, i32 111, i32 133,
	i32 81, i32 36, i32 136, i32 72, i32 132, i32 56, i32 14, i32 41,
	i32 49, i32 52, i32 84, i32 91, i32 92, i32 47, i32 57, i32 48,
	i32 102, i32 30, i32 30, i32 147, i32 123, i32 147, i32 122, i32 56,
	i32 140, i32 142, i32 32, i32 11, i32 71, i32 75, i32 120, i32 137,
	i32 133, i32 129, i32 13, i32 38, i32 21, i32 12, i32 7, i32 156,
	i32 115, i32 35, i32 53, i32 124, i32 88, i32 74, i32 64, i32 70,
	i32 6, i32 62, i32 116, i32 19, i32 95, i32 151, i32 122, i32 118,
	i32 75, i32 4, i32 130, i32 31, i32 29, i32 122, i32 90, i32 148,
	i32 10, i32 58, i32 51, i32 0, i32 145, i32 66, i32 126, i32 139,
	i32 87, i32 79, i32 38, i32 135, i32 80, i32 28, i32 125
], align 16

@marshal_methods_number_of_classes = dso_local local_unnamed_addr constant i32 0, align 4

@marshal_methods_class_cache = dso_local local_unnamed_addr global [0 x %struct.MarshalMethodsManagedClass] zeroinitializer, align 8

; Names of classes in which marshal methods reside
@mm_class_names = dso_local local_unnamed_addr constant [0 x ptr] zeroinitializer, align 8

@mm_method_names = dso_local local_unnamed_addr constant [1 x %struct.MarshalMethodName] [
	%struct.MarshalMethodName {
		i64 u0x0000000000000000, ; name: 
		ptr @.MarshalMethodName.0_name; char* name
	} ; 0
], align 8

; get_function_pointer (uint32_t mono_image_index, uint32_t class_index, uint32_t method_token, void*& target_ptr)
@get_function_pointer = internal dso_local unnamed_addr global ptr null, align 8

; Functions

; Function attributes: memory(write, argmem: none, inaccessiblemem: none) "min-legal-vector-width"="0" mustprogress "no-trapping-math"="true" nofree norecurse nosync nounwind "stack-protector-buffer-size"="8" uwtable willreturn
define void @xamarin_app_init(ptr nocapture noundef readnone %env, ptr noundef %fn) local_unnamed_addr #0
{
	%fnIsNull = icmp eq ptr %fn, null
	br i1 %fnIsNull, label %1, label %2

1: ; preds = %0
	%putsResult = call noundef i32 @puts(ptr @.str.0)
	call void @abort()
	unreachable 

2: ; preds = %1, %0
	store ptr %fn, ptr @get_function_pointer, align 8, !tbaa !3
	ret void
}

; Strings
@.str.0 = private unnamed_addr constant [40 x i8] c"get_function_pointer MUST be specified\0A\00", align 16

;MarshalMethodName
@.MarshalMethodName.0_name = private unnamed_addr constant [1 x i8] c"\00", align 1

; External functions

; Function attributes: "no-trapping-math"="true" noreturn nounwind "stack-protector-buffer-size"="8"
declare void @abort() local_unnamed_addr #2

; Function attributes: nofree nounwind
declare noundef i32 @puts(ptr noundef) local_unnamed_addr #1
attributes #0 = { memory(write, argmem: none, inaccessiblemem: none) "min-legal-vector-width"="0" mustprogress "no-trapping-math"="true" nofree norecurse nosync nounwind "stack-protector-buffer-size"="8" "target-cpu"="x86-64" "target-features"="+crc32,+cx16,+cx8,+fxsr,+mmx,+popcnt,+sse,+sse2,+sse3,+sse4.1,+sse4.2,+ssse3,+x87" "tune-cpu"="generic" uwtable willreturn }
attributes #1 = { nofree nounwind }
attributes #2 = { "no-trapping-math"="true" noreturn nounwind "stack-protector-buffer-size"="8" "target-cpu"="x86-64" "target-features"="+crc32,+cx16,+cx8,+fxsr,+mmx,+popcnt,+sse,+sse2,+sse3,+sse4.1,+sse4.2,+ssse3,+x87" "tune-cpu"="generic" }

; Metadata
!llvm.module.flags = !{!0, !1}
!0 = !{i32 1, !"wchar_size", i32 4}
!1 = !{i32 7, !"PIC Level", i32 2}
!llvm.ident = !{!2}
!2 = !{!".NET for Android remotes/origin/release/9.0.1xx @ 0ccdc57cf7fc59bd3f6cbf900c9cdbebadfe4609"}
!3 = !{!4, !4, i64 0}
!4 = !{!"any pointer", !5, i64 0}
!5 = !{!"omnipotent char", !6, i64 0}
!6 = !{!"Simple C++ TBAA"}
