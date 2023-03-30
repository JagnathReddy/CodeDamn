#include <bits/stdc++.h>
using namespace std;

string solution(string inStr){
string out="";
for(int i=1;i<inStr.length();i+=2)
out+=inStr[i];
return out;
}

int main() {
    string input="oaihgoersdgoihjiogadjfoiefdrtfyghbjnkhgfghjvnbfhgudhgiewgiqhfoiefhoiehiue";
    string expected="ahordohigdfifrfgbnhfhvbhuhiwihoehihu";
    if(expected.compare(solution(input))==0){
        cout<<"correct"<<endl;
    }else{
        cout<<"incorrect"<<endl;
    }
}