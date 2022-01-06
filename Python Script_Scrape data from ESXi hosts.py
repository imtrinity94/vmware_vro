# Script to read list of VMs and stats from each ESXi host and generate an Excel sheet.
# Hosts need to be updated manually.

import xlsxwriter
from pyvim import connect
import win32com.client as win32
from time import sleep
from math import pow, ceil

# Specify ESXi host(s) username and password
host_username = 'root'
host_password = 'password'

# Set filepath of XLSX file
filepath = r'C:\VMs.xlsx'

# List of ESXi hosts, can be DNS or IP
hosts = ['172.26.21.52',
         '172.26.21.53',
         '172.26.21.73',
         '172.26.21.103',
         '172.26.21.80',
         '172.26.21.81',
         '172.26.21.82',
         ]

# Create spreadsheet and set bold format for header
workbook = xlsxwriter.Workbook(filepath)
worksheet_vms = workbook.add_worksheet(name='VMs')
worksheet_hosts = workbook.add_worksheet(name='Hosts')
bold = workbook.add_format({'bold': True})

# Headers for first row
vm_header = ('Name',
          'ESX Host',
          'Power',
          'Hostname',
          'IP Address',
          'Operating System',
          'Notes',
          'Last Boot',
          'VMware Tools'
             )

# Headers for first row
hw_header = ('Host',
             'Version',
             'Build',
             'API Version',
             'License Version',
             'Vendor',
             'Model',
             'UUID',
             'CPU Model',
             'CPU Mhz',
             'CPU Count',
             'Core Count',
             'Thread Count',
             'Memory GB',
             'NICs',
             'Serial Number'
             )

vm_row = 0
hw_row = 0
vm_col = 0
hw_col = 0

# Write headers
for item in vm_header:
    worksheet_vms.write(vm_row, vm_col, item, bold)
    vm_col += 1

for item in hw_header:
    worksheet_hosts.write(hw_row, hw_col, item, bold)
    hw_col += 1


# Set row to start after headers
vm_row = 1
hw_row = 1

for host in hosts:

    # Open connection to ESXi host
    try:
        si = connect.SmartConnectNoSSL(host=host, user=host_username, pwd=host_password)
        print("Connected to {}".format(host))
    except:
        print("Failed to connect to {}".format(host))

    inv = si.RetrieveContent()
    dc1 = inv.rootFolder.childEntity[0]
    vmList = dc1.vmFolder.childEntity


    for vm in vmList:

        # More details can be accessed from vm.summary, but these are the most relevant
        powerState = vm.summary.runtime.powerState
        bootTime = str(vm.summary.runtime.bootTime)
        #maxCpuUsage = vm.summary.runtime.maxCpuUsage
        #maxMemoryUsage = vm.summary.runtime.maxMemoryUsage
        #paused = vm.summary.runtime.paused
        #snapshotInBackground = vm.summary.runtime.snapshotInBackground
        toolsStatus = vm.summary.guest.toolsStatus
        hostName = vm.summary.guest.hostName
        ipAddress = vm.summary.guest.ipAddress
        name = vm.summary.config.name
        #vmPathName = vm.summary.config.vmPathName
        #memorySizeMB = vm.summary.config.memorySizeMB
        #numEthernetCards = vm.summary.config.numEthernetCards
        #numVirtualDisks = vm.summary.config.numVirtualDisks
        #guestId = vm.summary.config.guestId
        guestFullName = vm.summary.config.guestFullName
        annotation = vm.summary.config.annotation

        # Add data to list so it can be written to file
        data = (name,
                host,
                powerState,
                hostName,
                ipAddress,
                guestFullName,
                annotation,
                bootTime,
                toolsStatus
        )

        vm_col = 0

        # Write data to row
        for x in data:
            worksheet_vms.write(vm_row, vm_col, x)
            vm_col += 1

        vm_row += 1

    vm_col = 0


    content = si.RetrieveContent()
    hw = si.content.rootFolder.childEntity[0].hostFolder.childEntity[0].host[0]

    # More details can be accessed from vm.summary, but these are the most relevant
    fullname = content.about.fullName
    version = content.about.version
    build = content.about.build
    apiVersion = content.about.apiVersion
    license = content.about.licenseProductVersion
    vendor = hw.summary.hardware.vendor
    model = hw.summary.hardware.model
    uuid = hw.summary.hardware.uuid
    cpuModel = hw.summary.hardware.cpuModel
    cpuMhz = hw.summary.hardware.cpuMhz
    numCpuPkgs = hw.summary.hardware.numCpuPkgs
    numCpuCores = hw.summary.hardware.numCpuCores
    numCpuThreads = hw.summary.hardware.numCpuThreads
    memorySize = ceil(hw.summary.hardware.memorySize / pow(1024, 3))
    numNics = hw.summary.hardware.numNics
    try:
        sn = hw.summary.hardware.otherIdentifyingInfo[1].identifierValue
    except:
        sn = "Unknown"

    # Add data to list so it can be written to file
    data = (host,
            version,
            build,
            apiVersion,
            license,
            vendor,
            model,
            uuid,
            cpuModel,
            cpuMhz,
            numCpuPkgs,
            numCpuCores,
            numCpuThreads,
            memorySize,
            numNics,
            sn
            )

    hw_col = 0

    # Write data to row
    for x in data:
        worksheet_hosts.write(hw_row, hw_col, x)
        hw_col += 1

    hw_row += 1

    # Disconnect from ESXi host
    connect.Disconnect(si)

workbook.close()

# Wait for file to be written
sleep(2)

# Some formatting on the created file so that cells are autofit size
excel = win32.gencache.EnsureDispatch('Excel.Application')
wb = excel.Workbooks.Open(filepath)
ws_vm = wb.Worksheets("VMs")
ws_hw = wb.Worksheets("Hosts")
ws_vm.Columns.AutoFit()
ws_hw.Columns.AutoFit()
wb.Save()
excel.Application.Quit()

print("Complete")
